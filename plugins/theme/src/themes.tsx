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

import React, { useMemo } from 'react';
import { AppTheme } from '@backstage/core-plugin-api';
import { themes } from '@backstage/theme';

import LightIcon from '@mui/icons-material/WbSunnyRounded';
import DarkIcon from '@mui/icons-material/Brightness2Rounded';
import { createTheme } from '@mui/material/styles';

import {
  createThemeProvider,
  createThemeProviderForThemeName,
  createThemeProviderForThemeConfig,
} from './components/ThemeProvider';
import * as backstage from './backstage';
import * as veecode from './veecode';

export const lightThemeProvider = createThemeProviderForThemeName('light');

export const darkThemeProvider = createThemeProviderForThemeName('dark');

export const getAllThemes = (): AppTheme[] => {
  return [
    {
      id: 'light',
      title: 'VeeCode Light (latest)',
      variant: 'light',
      icon: <LightIcon />,
      Provider: createThemeProviderForThemeName('light'),
    },
    {
      id: 'dark',
      title: 'VeeCode Dark (latest)',
      variant: 'dark',
      icon: <DarkIcon />,
      Provider: createThemeProviderForThemeName('dark'),
    },
    {
      id: 'light-customized',
      title: 'VeeCode Light (customized)',
      variant: 'light',
      icon: <LightIcon />,
      Provider: createThemeProviderForThemeConfig({
        mode: 'light',
        variant: 'veecode',
        palette: {
          primary: { main: '#ff0000' },
          secondary: { main: '#00ff00' },
        },
      }),
    },
    {
      id: 'dark-customized',
      title: 'VeeCode Dark (customized)',
      variant: 'dark',
      icon: <DarkIcon />,
      Provider: createThemeProviderForThemeConfig({
        mode: 'dark',
        variant: 'veecode',
        palette: {
          primary: { main: '#ff0000' },
          secondary: { main: '#00ff00' },
        },
      }),
    },
    {
      id: 'backstage-light',
      title: 'Backstage Light',
      variant: 'light',
      icon: <LightIcon />,
      Provider: createThemeProvider(themes.light),
    },
    {
      id: 'backstage-dark',
      title: 'Backstage Dark',
      variant: 'dark',
      icon: <DarkIcon />,
      Provider: createThemeProvider(themes.dark),
    },
  ];
};

export const useAllThemes = (): AppTheme[] => {
  return useMemo(() => getAllThemes(), []);
};

export const getThemes = (): AppTheme[] => {
  return [
    {
      id: 'light',
      title: 'Light',
      variant: 'light',
      icon: <LightIcon />,
      Provider: createThemeProviderForThemeName('light'),
    },
    {
      id: 'dark',
      title: 'Dark',
      variant: 'dark',
      icon: <DarkIcon />,
      Provider: createThemeProviderForThemeName('dark'),
    },
  ];
};

export const useThemes = (): AppTheme[] => {
  return useMemo(() => getThemes(), []);
};

export const useLoaderTheme = () => {
  return useMemo(() => {
    const latestTheme = localStorage.getItem('theme');
    const mode = latestTheme?.includes('dark') ? 'dark' : 'light';
    const variant = latestTheme?.includes('backstage')
      ? 'backstage'
      : 'veecode';
    const themeOptions =
      variant === 'backstage'
        ? backstage.getDefaultThemeConfig(mode)
        : veecode.getDefaultThemeConfig(mode);
    return createTheme(themeOptions);
  }, []);
};
