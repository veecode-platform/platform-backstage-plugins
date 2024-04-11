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
import { GithubServiceInfo,GitlabServiceInfo } from './providers';
import { ResponseService } from '../types';
import { ProviderEnum } from '../utils/enum';

export class ProviderService {

      static githubInfo : GithubServiceInfo;
      static gitlabInfo: GitlabServiceInfo;

      constructor(
        public provider: string,
        public host: string,
        private token: string
      ){
        ProviderService.githubInfo = new GithubServiceInfo(this.host, this.token);
        ProviderService.gitlabInfo = new GitlabServiceInfo(this.host, this.token);
      } 
      
      public async getUserAndOrgs() : Promise<ResponseService> {
        switch (this.provider) {
          case ProviderEnum.GITHUB:
            return {
              username: await ProviderService.githubInfo.getUserGithub(),
              organizations: await ProviderService.githubInfo.getOrgsGithub(),
            };
          case ProviderEnum.GITLAB:
            return {
              username: await ProviderService.gitlabInfo.getUserGitlab(),
              organizations: await ProviderService.gitlabInfo.getOrgsGitlab(),
            };
          default:
            return { username: 'Not Found', organizations: ['Not Found'] };
        }
      }

      public async getOgs(provider : string) : Promise<string[]> {
        switch(provider){
          case ProviderEnum.GITHUB:
            return await ProviderService.githubInfo.getOrgsGithub();
          case ProviderEnum.GITLAB:
            return await ProviderService.gitlabInfo.getOrgsGitlab();
          default:
            return ['not orgs avaliable']
        }
      }

      public async getUser(provider:string) :  Promise<string> {
        switch(provider){
          case ProviderEnum.GITHUB:
            return await ProviderService.githubInfo.getUserGithub();
          case ProviderEnum.GITLAB:
            return await ProviderService.gitlabInfo.getUserGitlab();
          default:
            return 'Not Owner avaliable'
        }
      }

      
}