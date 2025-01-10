import { CODE, CodeSignal } from "@motion-canvas/2d"

export const sideBarTree =  {
  name: "Ramen",
  children: [
    {
      name: "app",
      children: [
        {
          name: "model"
        }
      ]
    },
    {
      name: "config",
      children: [
        {
          name: "initializers",
          children: [
            {
              name: "file.rb",
              isFile: true
            }
          ]
        },
        {
          name: "routes.rb",
          isFile: true
        }
      ]
    },
    {
      name: "db",
      children: [
        {
          name: "migrations",
          children: [
            {
              name: "2094043095_create_user.rb",
              isFile: true
            }
          ]
        }
      ]
    },
    {
      name: "Gemfile",
      isFile: true
    }
  ]
}

export function routeFile(newRoute: CodeSignal<void>) {
  return CODE`
  Ramen::Engine.routes.draw do
    ${newRoute}
    resources :users
  end
  `
}