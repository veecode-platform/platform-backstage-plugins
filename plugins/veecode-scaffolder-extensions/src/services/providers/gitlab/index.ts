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
// eslint-disable-next-line @backstage/no-undeclared-imports
import axios from 'axios';
import { ParamsProvider } from '../../../types';

export async function getOrgsGitlab(Params: ParamsProvider): Promise<string[]> {
  const { host, token } = Params;

  const GITLAB_ORGS_URL = `https://${host}/api/v4/groups`;

  const headers = {
    'Private-Token': token,
  };
  const orgsList = [];

  try {
    const response = await axios.get(GITLAB_ORGS_URL, { headers });

    if (response.status === 200) {
      const orgs = response.data;
      for (const org of orgs) {
        orgsList.push(org.full_path as string);
      }
      return orgsList;
    }
    orgsList.push('Not Orgs');
    return orgsList;
  } catch (error) {
    orgsList.push('Not Orgs');
    return orgsList;
  }
}

export async function getUserGitlab(Params: ParamsProvider): Promise<string> {
  const { host, token } = Params;

  const GITLAB_USER_URL = `https://${host}/api/v4/user`;

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await axios.get(GITLAB_USER_URL, { headers });

    if (response.status === 200) {
      const owner = response.data.username;
      return owner;
    }
    return 'Not found';
  } catch (error) {
    return 'Not Found';
  }
}
