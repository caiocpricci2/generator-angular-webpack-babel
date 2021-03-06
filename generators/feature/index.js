var generators = require('yeoman-generator');
var mkdirp = require('mkdirp');
var path = require('path');

module.exports  = generators.NamedBase.extend({
  promptUser: function () {
    var done = this.async();

    var prompts = [
    {
      name: 'includeRun',
      message: "Should your feature have a run function?",
      default: true
    },
    {
      name: 'includeConfig',
      message: "Should your feature have a config function?",
      default: true
    }];

    this.prompt(prompts, function(props){
      this.includeRun = props.includeRun
      this.includeConfig = props.includeConfig

      done();
    }.bind(this))
  },
  copyMainFiles: function(){
    this.destinationRoot(path.join('client/app/features', this.name));
    var context = {
      featureName: this.name,
      includeRun : this.includeRun,
      includeConfig : this.includeConfig
    }

    if(this.includeRun){
      this.template("_run.js", this.name +".run.js", context);
    }
    if(this.includeConfig){
      this.template("_config.js", this.name +".config.js", context);
    }
      this.template("_tpl.html", this.name +".tpl.html", context);
      this.template("_routes.js", this.name +".routes.js", context);
      this.template("_controller.js", this.name +".controller.js", context);
      this.template("_index.js", "index.js", context);
      this.template("_.scss", this.name+".scss", context);
  }
});
