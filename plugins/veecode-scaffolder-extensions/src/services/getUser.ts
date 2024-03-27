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
import { getUserGithub, getUserGitlab } from './providers';
import { ParamsService } from '../types';

export async function getUser(Params: ParamsService): Promise<string> {
  const { provider, host, token } = Params;

  switch (provider) {
    case 'github':
      return await getUserGithub({ host, token });
    case 'gitlab':
      return await getUserGitlab({ host, token });
    default:
      return 'Not Owner avaliable';
  }
}  
export interface Config {
  /** Optional configurations for the SonarQube plugin */
  sonarqube?: {
    /**
     * The base url of the sonarqube installation. Defaults to https://sonarcloud.io.
     * @visibility frontend
     */
    baseUrl?: string;
  };
}
