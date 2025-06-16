/*
 * Copyright Red Hat, Inc.
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

import { BackstageTypography } from '@backstage/theme';

import { poppinsFonts } from './fonts';

// Font sized based on https://www.patternfly.org/design-foundations/typography
export const typography: BackstageTypography = {
  htmlFontSize: 16,
  fontFamily: poppinsFonts.text,
  h1: {
    fontFamily: poppinsFonts.heading,
    fontSize: 36,
    fontWeight: 400,
    marginBottom: 10,
  },
  h2: {
    fontFamily: poppinsFonts.heading,
    fontSize: 28,
    fontWeight: 400,
    marginBottom: 8,
  },
  h3: {
    fontFamily: poppinsFonts.heading,
    fontSize: 24,
    fontWeight: 400,
    marginBottom: 6,
  },
  h4: {
    fontFamily: poppinsFonts.heading,
    fontSize: 20,
    fontWeight: 400,
    marginBottom: 6,
  },
  h5: {
    fontFamily: poppinsFonts.heading,
    fontSize: 18,
    fontWeight: 500,
    marginBottom: 4,
  },
  h6: {
    fontFamily: poppinsFonts.heading,
    fontSize: 16,
    fontWeight: 500,
    marginBottom: 2,
  },
};
