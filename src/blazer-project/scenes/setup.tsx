import { CODE, Code, CodeSignal, Layout, Rect, Txt, makeScene2D } from "@motion-canvas/2d";
import { Direction, Reference, SimpleSignal, all, createRef, createSignal, delay, slideTransition, waitFor } from "@motion-canvas/core";
import { VSCode } from "../../assets/nodes/VSCode";

export default makeScene2D(function* (view) {
  yield* slideTransition(Direction.Left, .5);
  const vscodeRef = createRef<VSCode>();
  const gemBlazerRef = createRef<Txt>();
  const codeRef = createRef<Code>();

  const newGemSignal = Code.createSignal("");

  view.add(
    <VSCode
      ref={vscodeRef}
      sideBarTree={
        {
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
        }}
      height={() => view.height()}
      width={() => view.width()}
    >
      <Rect padding={10} paddingTop={5}>
        <Code
          ref={codeRef}
          fontSize={20}
          offsetX={-1}
          x={-400}
          code={gemFile(newGemSignal)}

        />
        {/* {gemFileEditor(gemBlazerRef)} */}
        {/* { blazerConfigEditor() } */}
      </Rect>

    </VSCode>
  )

  // yield* vscodeRef().highlightTree("Ramen/config/initializers/file.rb", 1);
  yield* waitFor(1);
  newGemSignal("gem 'blazer'")
  yield* all(
    codeRef().selection(codeRef().findAllRanges(/gem 'blazer'/gi), 0.5).back(0.5),
    // gemBlazerRef().text("gem 'blazer'", 2),
    vscodeRef().highlightTree("Ramen/Gemfile", .5)
  )
  yield* vscodeRef().submitToTerminal("bundle install", .5);
  yield* waitFor(.5);
  yield* vscodeRef().submitToTerminal("rails generate blazer:install", 1);
  yield* waitFor(1);
  yield* all(
    vscodeRef().addFileTo("Ramen/config", "blazer.yml", 1),
    codeRef().code(blazerConfigEditor(), 1),
    vscodeRef().addFileTo("Ramen/db/migrations", "200493004343_blazer.rb", 1),
    vscodeRef().addFileTo("Ramen/db/migrations", "200493004344_blazer.rb", 1),
  )
  yield* all(
    waitFor(2),
    codeRef().code(blazerMigration(), 1),
  )
  yield* vscodeRef().submitToTerminal("rails db:migrate", 1);

  newGemSignal("")
  yield* waitFor(8);

  yield* all(
    vscodeRef().highlightTree("Ramen/config/routes.rb", 1),
    codeRef().code(routeFile(newGemSignal), 1)
  )

  const urlSignal = Code.createSignal("biz-analytics");
  yield* all(
    waitFor(1),
    newGemSignal(CODE`mount Blazer::Engine, at: '${urlSignal}'`, 1)
  )

  yield* waitFor(2)
 
  yield* all(
    codeRef().selection(codeRef().findAllRanges(/biz-analytics'/gi), 3).back(2),
    // codeRef().code.replace(codeRef().findAllRanges(/biz-analytics'/gi)[0], "another_url", 0.6)
    delay(1.5, urlSignal("another_url", 1).back(1))
  )

  yield* waitFor(3)
})


function gemFileEditor(line: Reference<Txt>) {
  return (
    <Rect layout direction={"column"} gap={10}>
      <Layout>
        <Txt fontSize={20} fill={"gray"}>1 &nbsp; &nbsp; &nbsp; &nbsp;</Txt><Txt  fontSize={20} fill={"white"} text={"gem 'rails', '~> 6.1.4'"}/>
      </Layout>

      <Layout>
        <Txt fontSize={20} fill={"gray"}>2 &nbsp; &nbsp; &nbsp; &nbsp;</Txt><Txt  fontSize={20} fill={"white"} text={"gem 'pg', '~> 1.1'"}/>
      </Layout>

      <Layout>
        <Txt fontSize={20} fill={"gray"}>3 &nbsp; &nbsp; &nbsp; &nbsp;</Txt><Txt  fontSize={20} fill={"white"} text={"gem 'puma', '~> 5.0'"}/>
      </Layout>

      <Layout>
        <Txt fontSize={20} fill={"gray"}>4 &nbsp; &nbsp; &nbsp; &nbsp;</Txt><Txt  fontSize={20} fill={"white"} text={"gem 'bcrypt', '~> 3.1.7'"}/>
      </Layout>

      <Layout>
        <Txt fontSize={20} fill={"gray"}>5 &nbsp; &nbsp; &nbsp; &nbsp;</Txt><Txt  fontSize={20} fill={"white"} text={"gem 'bootsnap', '>= 1.4.4', require: false"}/>
      </Layout>

      <Layout>
        <Txt fontSize={20} fill={"gray"}>6 &nbsp; &nbsp; &nbsp; &nbsp;</Txt><Txt  fontSize={20} fill={"white"} text={"gem 'rack-cors'"}/>
      </Layout>

      <Layout>
        <Txt fontSize={20} fill={"gray"}>7 &nbsp; &nbsp; &nbsp; &nbsp;</Txt><Txt ref={line}  fontSize={20} fill={"white"} text={""}/>
      </Layout>
    </Rect>
  )
}

function gemFile(s: CodeSignal<void>) {
  return CODE`

  source 'https://rubygems.org'
  git_source(:github) { |repo| "https://github.com/#{repo}.git" }
  
  ruby '3.1.1'
  
  gem 'faker', git: 'https://github.com/faker-ruby/faker.git', branch: 'master'
  # Bundle edge Rails instead: gem 'rails', github: 'rails/rails', branch: 'main'
  gem 'rails', '~> 6.1.4'
  # Use postgresql as the database for Active Record
  gem 'pg', '~> 1.1'
  # Use Puma as the app server
  gem 'puma', '~> 5.0'
  # Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
  # gem 'jbuilder', '~> 2.7'
  # Use Redis adapter to run Action Cable in production
  # gem 'redis', '~> 4.0'
  # Use Active Model has_secure_password
  gem 'bcrypt', '~> 3.1.7'

  ${s}
  
  # Use Active Storage variant
  # gem 'image_processing', '~> 1.2'
  
  # Reduces boot times through caching; required in config/boot.rb
  gem 'bootsnap', '>= 1.4.4', require: false
  
  # Use Rack CORS for handling Cross-Origin Resource Sharing (CORS), making cross-origin AJAX possible
  # gem 'rack-cors'
  
  group :development, :test do
    # Call 'byebug' anywhere in the code to stop execution and get a debugger console
    gem 'byebug', platforms: %i[mri mingw x64_mingw]
  end
  
  group :development do
    gem 'listen', '~> 3.3'
    gem 'rubocop', '>= 1.0', '< 2.0'
    # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
    gem 'spring'
  end
  
  # Windows does not include zoneinfo files, so bundle the tzinfo-data gem
  gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]  
  `
}

function blazerConfigEditor () {
  return CODE`
  data_sources:
  main:
    url: <%%= ENV["BLAZER_DATABASE_URL"] %>

    # statement timeout, in seconds
    # none by default
    # timeout: 15

    # caching settings
    # can greatly improve speed
    # off by default
    # cache:
    #   mode: slow # or all
    #   expires_in: 60 # min
    #   slow_threshold: 15 # sec, only used in slow mode

    # wrap queries in a transaction for safety
    # not necessary if you use a read-only user
    # true by default
    # use_transaction: false

    smart_variables:
      # zone_id: "SELECT id, name FROM zones ORDER BY name ASC"
      # period: ["day", "week", "month"]
      # status: {0: "Active", 1: "Archived"}

    linked_columns:
      # user_id: "/admin/users/{value}"

    smart_columns:
      # user_id: "SELECT id, name FROM users WHERE id IN {value}"

# create audits
audit: true

# change the time zone
# time_zone: "Pacific Time (US & Canada)"

# class name of the user model
# user_class: User

# method name for the current user
# user_method: current_user

# method name for the display name
# user_name: name

# custom before_action to use for auth
# before_action_method: require_admin

# email to send checks from
# from_email: blazer@example.org

# webhook for Slack
# slack_webhook_url: <%%= ENV["BLAZER_SLACK_WEBHOOK_URL"] %>

check_schedules:
  - "1 day"
  - "1 hour"
  - "5 minutes"

# enable anomaly detection
# note: with trend, time series are sent to https://trendapi.org
# anomaly_checks: prophet / trend / anomaly_detection

# enable forecasting
# note: with trend, time series are sent to https://trendapi.org
# forecasting: prophet / trend

# enable map
# mapbox_access_token: <%%= ENV["MAPBOX_ACCESS_TOKEN"] %>

# enable uploads
# uploads:
#   url: <%%= ENV["BLAZER_UPLOADS_URL"] %>
#   schema: uploads
#   data_source: main      
  `
}

function blazerMigration() {
  return `  
def change
  create_table :blazer_queries do |t|
    t.references :creator
    t.string :name
    t.text :description
    t.text :statement
    t.string :data_source
    t.string :status
    t.timestamps null: false
  end

  create_table :blazer_audits do |t|
    t.references :user
    t.references :query
    t.text :statement
    t.string :data_source
    t.datetime :created_at
  end

  create_table :blazer_dashboards do |t|
    t.references :creator
    t.string :name
    t.timestamps null: false
  end

  create_table :blazer_dashboard_queries do |t|
    t.references :dashboard
    t.references :query
    t.integer :position
    t.timestamps null: false
  end

  create_table :blazer_checks do |t|
    t.references :creator
    t.references :query
    t.string :state
    t.string :schedule
    t.text :emails
    t.text :slack_channels
    t.string :check_type
    t.text :message
    t.datetime :last_run_at
    t.timestamps null: false
  end
end
`
}

function routeFile(newRoute: CodeSignal<void>) {
  return CODE`
  Ramen::Engine.routes.draw do
    ${newRoute}
    resources :users
  end
  `
}