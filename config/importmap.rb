pin "application"
pin "@hotwired/turbo-rails", to: "turbo.min.js"
pin "@hotwired/stimulus", to: "stimulus.min.js"
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js"
pin_all_from "app/javascript/controllers", under: "controllers"
pin "place", to: "place.js"
pin "type_to_category_map", to: "type_to_category_map.js"
pin "@rails/actioncable", to: "actioncable.esm.js"
pin_all_from "app/javascript/channels", under: "channels"
pin "timediff", to: "timediff.js"
pin "time_display", to: "time_display.js"
pin "preview", to: "preview.js"




# Pin npm packages by running ./bin/importmap

# pin "application"
# pin "@hotwired/turbo-rails", to: "turbo.min.js"
# pin "@hotwired/stimulus", to: "stimulus.min.js"
# pin "@hotwired/stimulus-loading", to: "stimulus-loading.js"
# pin_all_from "app/javascript/controllers", under: "controllers"
# pin "place", to: "place.js"
# pin "type_to_category_map", to: "type_to_category_map.js"
# pin "@rails/actioncable", to: "actioncable.esm.js"
# pin_all_from "app/javascript/channels", under: "channels"
# pin "timediff", to: "timediff.js"
# pin "time_display", to: "time_display.js"
