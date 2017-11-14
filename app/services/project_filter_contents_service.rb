class ProjectFilterContentsService
  def initialize(user)
  end

  def fetch
    {
      "selectors"=>["occupationType", "hiringType", "area", "trait"],
      "selected"=>{"occupationType"=>["engineer"], "hiringType"=>["mid_career"], "area"=>[], "trait"=>[]},
      "occupationType"=>{
        "placeholder"=>"職種を選択 ...",
        "name"=>"occupationType",
        "label"=>"職種",
        "items"=>[
          {"selector"=>"occupationType", "label"=>"エンジニア", "name"=>"engineer", "query"=>"occupation_types", "type"=>"array"},
          {"selector"=>"occupationType", "label"=>"デザイナー", "name"=>"designer", "query"=>"occupation_types", "type"=>"array"},
          {"selector"=>"occupationType", "label"=>"ディレクター", "name"=>"director", "query"=>"occupation_types", "type"=>"array"},
          {"selector"=>"occupationType", "label"=>"コーポレート・スタッフ", "name"=>"corporate_staff", "query"=>"occupation_types", "type"=>"array"},
          {"selector"=>"occupationType", "label"=>"セールス", "name"=>"sales", "query"=>"occupation_types", "type"=>"array"},
          {"selector"=>"occupationType", "label"=>"マーケティング", "name"=>"marketing", "query"=>"occupation_types", "type"=>"array"},
          {"selector"=>"occupationType", "label"=>"ライター", "name"=>"writer", "query"=>"occupation_types", "type"=>"array"},
          {"selector"=>"occupationType", "label"=>"その他", "name"=>"others", "query"=>"occupation_types", "type"=>"array"}
        ]
      },
      "hiringType"=>{
        "placeholder"=>"採用形態を選択 ...",
        "name"=>"hiringType",
        "label"=>"採用形態",
        "items"=>[
          {"selector"=>"hiringType", "label"=>"新卒採用", "name"=>"newgrad", "query"=>"hiring_types", "type"=>"array"},
          {"selector"=>"hiringType", "label"=>"インターン・学生バイト", "name"=>"internship", "query"=>"hiring_types", "type"=>"array"},
          {"selector"=>"hiringType", "label"=>"中途採用", "name"=>"mid_career", "query"=>"hiring_types", "type"=>"array"},
          {"selector"=>"hiringType", "label"=>"社会人バイト・契約・委託", "name"=>"contract", "query"=>"hiring_types", "type"=>"array"}
        ]
      },
      "area"=>{
        "leader_label"=>"さらに表示",
        "name"=>"area",
        "label"=>"地域",
        "items"=>[
          {"selector"=>"area", "label"=>"東京", "name"=>"tokyo", "query"=>"locations", "type"=>"array"},
          {"selector"=>"area", "label"=>"大阪", "name"=>"osaka", "query"=>"locations", "type"=>"array"},
          {"selector"=>"area", "label"=>"名古屋", "name"=>"nagoya", "query"=>"locations", "type"=>"array"},
          {"selector"=>"area", "label"=>"京都", "name"=>"kyoto", "query"=>"locations", "type"=>"array"},
          {"selector"=>"area", "label"=>"福岡", "name"=>"fukuoka", "query"=>"locations", "type"=>"array"},
          {"selector"=>"area", "label"=>"札幌", "name"=>"sapporo", "query"=>"locations", "type"=>"array"},
          {"selector"=>"area", "label"=>"北海道・東北", "name"=>"tohoku", "query"=>"locations", "type"=>"array"},
          {"selector"=>"area", "label"=>"関東", "name"=>"kanto", "query"=>"locations", "type"=>"array"},
          {"selector"=>"area", "label"=>"北陸・甲信越", "name"=>"hokuriku", "query"=>"locations", "type"=>"array"},
          {"selector"=>"area", "label"=>"東海", "name"=>"tokai", "query"=>"locations", "type"=>"array"},
          {"selector"=>"area", "label"=>"近畿", "name"=>"kinki", "query"=>"locations", "type"=>"array"},
          {"selector"=>"area", "label"=>"中国・四国", "name"=>"chugoku", "query"=>"locations", "type"=>"array"},
          {"selector"=>"area", "label"=>"九州・沖縄", "name"=>"kyushu", "query"=>"locations", "type"=>"array"}
        ]
      },
      "trait"=>{
        "leader_label"=>"さらに表示",
        "name"=>"trait",
        "label"=>"特徴",
        "items"=>[
          {"selector"=>"trait", "label"=>"1億円以上の資金を調達済み", "name"=>"funded1m", "query"=>"company_tags", "type"=>"array"},
          {"selector"=>"trait", "label"=>"TechCrunchに掲載実績あり", "name"=>"techcrunch", "query"=>"company_tags", "type"=>"array"},
          {"selector"=>"trait", "label"=>"Skypeで話を聞ける", "name"=>"remote_visit", "query"=>"project_tags", "type"=>"array"},
          {"selector"=>"trait", "label"=>"社長がプログラミングできる", "name"=>"ceo_can_code", "query"=>"company_tags", "type"=>"array"},
          {"selector"=>"trait", "label"=>"3000万円以上の資金を調達済み", "name"=>"funded3k", "query"=>"company_tags", "type"=>"array"},
          {"selector"=>"trait", "label"=>"ランチをご馳走します", "name"=>"lunch", "query"=>"project_tags", "type"=>"array"},
          {"selector"=>"trait", "label"=>"海外進出している", "name"=>"overseas", "query"=>"company_tags", "type"=>"array"},
          {"selector"=>"trait", "label"=>"社長が20代", "name"=>"ceo_is_in_20s", "query"=>"company_tags", "type"=>"array"},
          {"selector"=>"trait", "label"=>"留学生さん歓迎", "name"=>"international", "query"=>"project_tags", "type"=>"array"},
          {"selector"=>"trait", "label"=>"週末からのコミットでもOK", "name"=>"weekend", "query"=>"project_tags", "type"=>"array"},
          {"selector"=>"trait", "label"=>"友達と一緒に訪問OK", "name"=>"friend", "query"=>"project_tags", "type"=>"array"},
          {"selector"=>"trait", "label"=>"学生さんも歓迎", "name"=>"student", "query"=>"project_tags", "type"=>"array"}
        ]
      }
    }
  end
end

