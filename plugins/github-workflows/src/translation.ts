/*
 * Copyright 2023 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { createTranslationRef } from '@backstage/core-plugin-api/alpha';

/** @alpha */
export const githubWorkflowsTranslationRef = createTranslationRef({
  id: 'githubWorkflows',
  messages: {
    overview:{
        title: 'Welcome to github-workflows!',
        subtitle: 'Platform Plugin',
        supportButton: 'A description of your plugin goes here.'
    },
    worflowList: {
      title: 'All Workflows',
      refreshButtonTooltip: 'Reload Workflows Runs',
      sourceTooltip: 'Visite wokflow',
      logsTooltip:'View Logs',
      buttonAddParameters:'Add Parameters',
      table:{
        column1: 'NAME',
        column2: 'STATUS',
        column3: 'ACTION',
        column4: 'SOURCE',
        column5: 'LOGS'
      },
    },
    workflowCard:{
      title:'Workflows',
      refreshButtonTooltip: 'Refresh',
      buttonAddParameters: 'Add Parameters',
      noRecords: 'No records to display'
    },
    modalComponent:{
      dialog:{
        title: 'Workflows Parameters',
        content: 'Fill in the fields according to the values set in the project workflow.',
      },
      buttons:{
        cancel: 'Cancel',
        submit: 'Submit'
      },
      errors:{
        name: 'use at least 3 caracters'
      }
    },
    selectBranchComponent:{
      selectTooltip: 'Select the branch'
    },
    emptyState:{
      title: 'No Workflow Data',
      description: 'This component has GitHub Actions enabled, but no data was found. Have you created any Workflows? Click the button below to create a new Workflow.',
      createWorkflowButton: 'Create new Workflow'
    },
    errorBoundary:{
      alert: 'Something went wrong. Please make sure that you installed:'
    },
    actions:{
      tooltip:{
        wait: 'Please wait',
        stop: 'Stop',
        tryAgain: 'Try Again',
        reRun: 'Re-run',
        runWorkflow: 'Run Workflow'
      }
    },
    status:{
      error: 'Error',
      wait: 'Please wait',
      stop: 'Stop',
      aborted: 'Aborted',
      success: 'Success',
      inProgress: 'In progress',
      pending: 'Queued',
      timeout: 'Time out',
      completed: 'Completed',
      runWorkflow: 'Run Workflow'
    }
  },
});