'use strict';
const Promise = require('bluebird');

module.exports = function(Project) {
  Project.setStages = function(callback) {
    const newProject = {name: 'test'};
    const newStage = [{number: 1}];
    const newExecutives = [];
    const countExecutives = 20;
    for (let i = 0; i < countExecutives; i++) {
      newExecutives.push({name: `executive ${i + 1}`});
    }

    // create Project
    Project.create(newProject).then(project => {
      // create Stage in Project
      project.stagesRel.create(newStage).then(stage => {
        // create serially <countExecutives> Executives in Stage
        Promise.mapSeries(newExecutives, executive => {
          return stage.executivesRel.create(executive); // bug
        }).then(() => callback(null, true));
      });
    });
  };
};
