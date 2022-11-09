import React from 'react';

export interface IRoute {
  path: string;
  name: string;
  component: React.LazyExoticComponent<React.ComponentType<any>>;
  icon?: string;
}
