/*
 * Copyright Red Hat, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Import Poppins font files
import PoppinsThin from './assets/fonts/poppins/Poppins-Thin.ttf';
import PoppinsThinItalic from './assets/fonts/poppins/Poppins-ThinItalic.ttf';
import PoppinsExtraLight from './assets/fonts/poppins/Poppins-ExtraLight.ttf';
import PoppinsExtraLightItalic from './assets/fonts/poppins/Poppins-ExtraLightItalic.ttf';
import PoppinsLight from './assets/fonts/poppins/Poppins-Light.ttf';
import PoppinsLightItalic from './assets/fonts/poppins/Poppins-LightItalic.ttf';
import PoppinsRegular from './assets/fonts/poppins/Poppins-Regular.ttf';
import PoppinsItalic from './assets/fonts/poppins/Poppins-Italic.ttf';
import PoppinsMedium from './assets/fonts/poppins/Poppins-Medium.ttf';
import PoppinsMediumItalic from './assets/fonts/poppins/Poppins-MediumItalic.ttf';
import PoppinsSemiBold from './assets/fonts/poppins/Poppins-SemiBold.ttf';
import PoppinsSemiBoldItalic from './assets/fonts/poppins/Poppins-SemiBoldItalic.ttf';
import PoppinsBold from './assets/fonts/poppins/Poppins-Bold.ttf';
import PoppinsBoldItalic from './assets/fonts/poppins/Poppins-BoldItalic.ttf';
import PoppinsExtraBold from './assets/fonts/poppins/Poppins-ExtraBold.ttf';
import PoppinsExtraBoldItalic from './assets/fonts/poppins/Poppins-ExtraBoldItalic.ttf';
import PoppinsBlack from './assets/fonts/poppins/Poppins-Black.ttf';
import PoppinsBlackItalic from './assets/fonts/poppins/Poppins-BlackItalic.ttf';

// Define Poppins font faces for each weight and style
const PoppinsThinFontFace = {
  fontFamily: 'Poppins',
  src: `url(${PoppinsThin}) format('truetype')`,
  fontWeight: '100',
  fontStyle: 'normal',
  fontDisplay: 'fallback',
};

const PoppinsThinItalicFontFace = {
  fontFamily: 'Poppins',
  src: `url(${PoppinsThinItalic}) format('truetype')`,
  fontWeight: '100',
  fontStyle: 'italic',
  fontDisplay: 'fallback',
};

const PoppinsExtraLightFontFace = {
  fontFamily: 'Poppins',
  src: `url(${PoppinsExtraLight}) format('truetype')`,
  fontWeight: '200',
  fontStyle: 'normal',
  fontDisplay: 'fallback',
};

const PoppinsExtraLightItalicFontFace = {
  fontFamily: 'Poppins',
  src: `url(${PoppinsExtraLightItalic}) format('truetype')`,
  fontWeight: '200',
  fontStyle: 'italic',
  fontDisplay: 'fallback',
};

const PoppinsLightFontFace = {
  fontFamily: 'Poppins',
  src: `url(${PoppinsLight}) format('truetype')`,
  fontWeight: '300',
  fontStyle: 'normal',
  fontDisplay: 'fallback',
};

const PoppinsLightItalicFontFace = {
  fontFamily: 'Poppins',
  src: `url(${PoppinsLightItalic}) format('truetype')`,
  fontWeight: '300',
  fontStyle: 'italic',
  fontDisplay: 'fallback',
};

const PoppinsRegularFontFace = {
  fontFamily: 'Poppins',
  src: `url(${PoppinsRegular}) format('truetype')`,
  fontWeight: '400',
  fontStyle: 'normal',
  fontDisplay: 'fallback',
};

const PoppinsItalicFontFace = {
  fontFamily: 'Poppins',
  src: `url(${PoppinsItalic}) format('truetype')`,
  fontWeight: '400',
  fontStyle: 'italic',
  fontDisplay: 'fallback',
};

const PoppinsMediumFontFace = {
  fontFamily: 'Poppins',
  src: `url(${PoppinsMedium}) format('truetype')`,
  fontWeight: '500',
  fontStyle: 'normal',
  fontDisplay: 'fallback',
};

const PoppinsMediumItalicFontFace = {
  fontFamily: 'Poppins',
  src: `url(${PoppinsMediumItalic}) format('truetype')`,
  fontWeight: '500',
  fontStyle: 'italic',
  fontDisplay: 'fallback',
};

const PoppinsSemiBoldFontFace = {
  fontFamily: 'Poppins',
  src: `url(${PoppinsSemiBold}) format('truetype')`,
  fontWeight: '600',
  fontStyle: 'normal',
  fontDisplay: 'fallback',
};

const PoppinsSemiBoldItalicFontFace = {
  fontFamily: 'Poppins',
  src: `url(${PoppinsSemiBoldItalic}) format('truetype')`,
  fontWeight: '600',
  fontStyle: 'italic',
  fontDisplay: 'fallback',
};

const PoppinsBoldFontFace = {
  fontFamily: 'Poppins',
  src: `url(${PoppinsBold}) format('truetype')`,
  fontWeight: '700',
  fontStyle: 'normal',
  fontDisplay: 'fallback',
};

const PoppinsBoldItalicFontFace = {
  fontFamily: 'Poppins',
  src: `url(${PoppinsBoldItalic}) format('truetype')`,
  fontWeight: '700',
  fontStyle: 'italic',
  fontDisplay: 'fallback',
};

const PoppinsExtraBoldFontFace = {
  fontFamily: 'Poppins',
  src: `url(${PoppinsExtraBold}) format('truetype')`,
  fontWeight: '800',
  fontStyle: 'normal',
  fontDisplay: 'fallback',
};

const PoppinsExtraBoldItalicFontFace = {
  fontFamily: 'Poppins',
  src: `url(${PoppinsExtraBoldItalic}) format('truetype')`,
  fontWeight: '800',
  fontStyle: 'italic',
  fontDisplay: 'fallback',
};

const PoppinsBlackFontFace = {
  fontFamily: 'Poppins',
  src: `url(${PoppinsBlack}) format('truetype')`,
  fontWeight: '900',
  fontStyle: 'normal',
  fontDisplay: 'fallback',
};

const PoppinsBlackItalicFontFace = {
  fontFamily: 'Poppins',
  src: `url(${PoppinsBlackItalic}) format('truetype')`,
  fontWeight: '900',
  fontStyle: 'italic',
  fontDisplay: 'fallback',
};

// Export an array of all Poppins font faces
export const poppinsFontFaces = [
  PoppinsThinFontFace,
  PoppinsThinItalicFontFace,
  PoppinsExtraLightFontFace,
  PoppinsExtraLightItalicFontFace,
  PoppinsLightFontFace,
  PoppinsLightItalicFontFace,
  PoppinsRegularFontFace,
  PoppinsItalicFontFace,
  PoppinsMediumFontFace,
  PoppinsMediumItalicFontFace,
  PoppinsSemiBoldFontFace,
  PoppinsSemiBoldItalicFontFace,
  PoppinsBoldFontFace,
  PoppinsBoldItalicFontFace,
  PoppinsExtraBoldFontFace,
  PoppinsExtraBoldItalicFontFace,
  PoppinsBlackFontFace,
  PoppinsBlackItalicFontFace,
];

// Define font stacks using Poppins
export const poppinsFonts = {
  text: [
    'Poppins',
    '"Helvetica Neue"',
    '-apple-system',
    '"Segoe UI"',
    'Roboto',
    'Helvetica',
    'Arial',
    'sans-serif',
  ].join(', '),
  heading: [
    'Poppins',
    '"Helvetica Neue"',
    '-apple-system',
    '"Segoe UI"',
    'Roboto',
    'Helvetica',
    'Arial',
    'sans-serif',
  ].join(', '),
  // Assuming you don't have a monospace Poppins font,
  // we'll keep a generic monospace stack. If you have one, import and use it.
  monospace: [
    '"Liberation Mono"',
    'consolas',
    '"SFMono-Regular"',
    'menlo',
    'monaco',
    '"Courier New"',
    'monospace',
  ].join(', '),
};
