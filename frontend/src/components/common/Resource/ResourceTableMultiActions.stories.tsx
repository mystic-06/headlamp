/*
 * Copyright 2025 The Kubernetes Authors
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

import { Meta, StoryFn } from '@storybook/react';
import { MRT_TableInstance } from 'material-react-table';
import DaemonSet from '../../../lib/k8s/daemonSet';
import Deployment from '../../../lib/k8s/deployment';
import { KubeObject } from '../../../lib/k8s/KubeObject';
import ReplicaSet from '../../../lib/k8s/replicaSet';
import StatefulSet from '../../../lib/k8s/statefulSet';
import { TestContext } from '../../../test';
import ResourceTableMultiActions from './ResourceTableMultiActions';

export default {
  title: 'Resource/ResourceTableMultiActions',
  component: ResourceTableMultiActions,
  decorators: [
    Story => (
      <TestContext>
        <Story />
      </TestContext>
    ),
  ],
} as Meta;

const MOCK_CLUSTER = 'local';

function makeMockTable(items: KubeObject[]): MRT_TableInstance<any> {
  return {
    getSelectedRowModel: () => ({
      rows: items.map(item => ({ original: item })),
      flatRows: items.map(item => ({ original: item })),
      rowsById: {},
    }),
    resetRowSelection: () => {},
    getIsSomeRowsSelected: () => items.length > 0,
    getIsAllRowsSelected: () => false,
  } as unknown as MRT_TableInstance<any>;
}

const mockDeployment = new Deployment(
  {
    apiVersion: 'apps/v1',
    kind: 'Deployment',
    metadata: {
      name: 'deployment',
      namespace: 'default',
    },
  } as any,
  MOCK_CLUSTER
);

const mockStatefulSet = new StatefulSet(
  {
    apiVersion: 'apps/v1',
    kind: 'StatefulSet',
    metadata: {
      name: 'statefulset',
      namespace: 'default',
    },
  } as any,
  MOCK_CLUSTER
);

const mockDaemonSet = new DaemonSet(
  {
    apiVersion: 'apps/v1',
    kind: 'DaemonSet',
    metadata: {
      name: 'daemonset',
      namespace: 'default',
    },
  } as any,
  MOCK_CLUSTER
);

const mockReplicaSet = new ReplicaSet(
  {
    apiVersion: 'apps/v1',
    kind: 'ReplicaSet',
    metadata: {
      name: 'replicaset',
      namespace: 'default',
    },
  } as any,
  MOCK_CLUSTER
);

// With only one Deployment
export const Default: StoryFn = () => (
  <ResourceTableMultiActions table={makeMockTable([mockDeployment])} />
);

// Multiple restartable items of different kinds
export const WithRestartableItems: StoryFn = () => (
  <ResourceTableMultiActions
    table={makeMockTable([mockDeployment, mockStatefulSet, mockDaemonSet])}
  />
);

// Non-restartable resource
export const WithNonRestartableItems: StoryFn = () => (
  <ResourceTableMultiActions table={makeMockTable([mockReplicaSet])} />
);

// Mixed - one restartable + one non-restartable
export const WithMixedItems: StoryFn = () => (
  <ResourceTableMultiActions table={makeMockTable([mockDeployment, mockReplicaSet])} />
);

// Empty selection
export const EmptySelection: StoryFn = () => (
  <ResourceTableMultiActions table={makeMockTable([])} />
);
