import React from 'react';
import { theme as chakraTheme } from '@chakra-ui/react';

const theme = {
    ...chakraTheme,
    fonts: {
        ...chakraTheme.fonts,
        body: '"Roboto", sans-serif',
    },
    fontWeights: {
        normal: 400,
        medium: 600,
        bold: 700
    },
    icons: {
        ...chakraTheme.icons,

    }
}

export default theme;