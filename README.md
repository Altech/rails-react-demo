# README

This repository is a demo application for next architecture of www.wantedly.com

## Technology

- Server-side
  - Rails for typical MVC and API
  - hypernova for Server-side rendering
  - See [doc](doc/server.md)
- Client-side
  - React + Redux for Rich UI
  - Server-side rendering for faster First Meaningful Paint and SEO
  - Dynamic import for shorter time to be interactive
  - TypeScript for Productivity
  
## Development

Set up first..

```
bin/setup
yarn
```

and run these processes.

```
bin/rails s # Start Rails server
yarn start # Start webpack-dev-server
yarn run hypernova # Start hypernova server for Server-side Rendering
```
