# frontend v3 サーバーサイド構成

## RESTfulAPI: api/v2

[API v2 - protocol and implementation](api_v2.md) を参照。
コード的には `lib` ディレクトリに `Api` モジュールとして基盤実装がある。

## BulkAPI: non-api

First Meaningful Paint time を最小化するために、画面遷移時に必要な情報を一気に取ってくるための API. api/v2 が単一のリソースをシリアライズして返すのに対して、こちらは複数のリソースを一気に取得して返すことができる。api/v2 に対する Backend for Frontend のような位置付けで、RESTful API のコードベースを活用することができる。

また、画面遷移ではなく外からのランディング時はそのデータを用いて hypernova で Server-Side Rendering した HTML を返してくれる。

コード的には `lib`ディレクトリに `ReactStateRenderer` として基盤実装がある。

## projects#index の例

### controller

`render_react` というヘルパーメソッドが提供されていて、これに複数のデータをハッシュ形式で渡すことができる。各データは、モデルやリレーションなどシリアライズ可能なものを渡すと、`ActiveModel::Serializers` を使ってシリアライズされた JSON が返る。

```rb
class ProjectsController < ApplicationController
  def index
    @projects = Project.listed.order(monthly_support_count: :desc).page(params[:page] || 1).per(params[:per] || 5)
    @project_filter = ProjectFilterContentsService.new(current_user).fetch
    @featured_projects = Project.where(is_featured: true).order('RANDOM()').limit(5)

    render_react projects: @projects,
      featured_projects: @featured_projects,
      project_filter: @project_filter,
      total_count: @projects.total_count
  end
```

#### ヘルパーメソッド `render_react` について

以下のように、`ReactStateRenderer` でシリアライズした結果を要求された形式によって JSON か HTML(SSR) で返すようになっている。`options` は通常の `render` メソッドに渡るので、ステータスコードの設定などはここで行うことができる。その他、

* `react_global_state` メソッドをオーバーライドすることで、全体で使う状態（認証情報など）を追加できる。
* view template `application/ssr` をカスタマイズすることで、非 React 箇所も含めて部分的に共通化した view （例：ヘッダー）などを提供できる

```rb
class ReactStateRenderer
  module ControllerHelpers
    def render_react(data, options = {})
      @react_state = ReactStateRenderer.new(
        data,
        request: request,
        controller: controller_name,
        action: action_name,
        global: react_global_state,
      ).perform

      respond_to do |format|
        format.html do
          hypernova_render_support do
            render({ template: 'application/ssr' }.reverse_merge(options))
          end
        end
        format.json do
          render({ json: @react_state }.reverse_merge(options))
        end
      end
    end
    def react_global_state; {} end
  end
end
```

### view: 利用するフィールド・アソシエーションの定義

具体的に Project のどのフィールド・アソシエーションを返すかは、SSR まで考慮すると Rails サーバーが知らなければいけない。そのため、 app/views 以下に Rails の規約に従って YAML ファイルを作り記述する。このファイルがない場合は全てのフィールドと一段回までネストしたアソシエーションが返るので、開発を始めるタイミングでは使えるフィールドが全て返る状態で進められる。

```yaml
# app/views/projects/index.yaml
projects:
  _fields:
    - title
    - looking_for
    - published_at
    - monthly_support_count
    - canonical_path
  company:
    _fields:
      - name
      - canonical_path
    avatar:
      _fields:
        - url
featured_projects:
  _fields:
    - title
    - looking_for
    - monthly_support_count
    - canonical_path
  company:
    _fields:
      - name
      - canonical_path
    avatar:
      _fields:
        - url
```

具体的な記述ルールとしては、複数のデータ（この場合は `projects` と `featured_projects`）のそれぞれに対して分けて書く。フィールドは `_fields` というキーで配列形式で記述し、アソシエーションはそのままアソシエーションの名前を書いて更にその中に `_fields` であったり更にネストしたアソシエーションであったりを記述する。デフォルトで `id` と `_entity_type`（クラス名）がフィールドとして入るので、それ以外を記述すれば良い。

`ReactStateRenderer` はこの YAML ファイルを読み込み、要求されてる情報に応じて（v2でも使っている）`Api::Preloder` を用いて preload を行った上で、 `ActiveModel::Serializsers` の引数として渡せる形式に変換しシリアライズを行う。
