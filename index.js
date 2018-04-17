// Copyright 2016, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

("use strict");

process.env.DEBUG = "actions-on-google:*";
let Assistant = require("actions-on-google").ApiAiAssistant;
let express = require("express");
let bodyParser = require("body-parser");

let app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: "application/json" }));

// we comunicate with arduino with post requests

// require basic auth
app.post("/", function(req, res) {
  const assistant = new Assistant({ request: req, response: res });
  // Fulfill action business logic
  function responseHandler(assistant) {
    // Complete your fulfillment logic and send a response
    var object = req.body.result.parameters.object;
    var number = req.body.result.parameters.number;
    var state = req.body.result.parameters.state;

    console.log(object + number + state);

    res.send(object);
  }

  assistant.handleRequest(responseHandler);
});

// Start the server
let server = app.listen(process.env.PORT || 7000, function() {
  let port = server.address().port;
  console.log("App listening on port %s", port);
});

module.exports = app;
