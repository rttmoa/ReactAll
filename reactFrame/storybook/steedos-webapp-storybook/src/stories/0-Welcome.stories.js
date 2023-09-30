import React from 'react';
import { linkTo } from '@storybook/addon-links';
import { Welcome } from '@storybook/react/demo';

export default {
  title: 'Welcome',
};

export const toStorybook = () => <Welcome showApp={linkTo('Button')} />
// export const toStorybook = () => <div>测试Welcome</div>
  
toStorybook.story = {
  name: 'to Storybook',
};
