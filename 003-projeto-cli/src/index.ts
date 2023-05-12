#!/usr/bin/env node
//
import inquirer from 'inquirer';

// Questions
import { questions } from 'questions';

// Interface
import { IAnswers } from 'interface/answers.interface';

// Controller
import { GenFile } from 'controller/generate.controller';

class Init {
  constructor() {
    inquirer.prompt(questions).then((answers: IAnswers) => {
      GenFile.gen(answers);
    });
  }
}

new Init();
