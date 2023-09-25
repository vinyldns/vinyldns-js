/*
 * Copyright 2019 Comcast Cable Communications Management, LLC
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

module.exports = {
  getZones: {
    zones: [{
      status: 'Active',
      account: 'a0b5ea74-cc05-4932-a294-9bf935d52744',
      name: 'list-zones-test-searched-1.',
      created: '2016-12-16T15:21:47Z',
      adminGroupId: 'a0b5ea74-cc05-4932-a294-9bf935d52744',
      email: 'test@test.com',
      shared: false,
      acl: {
        rules: []
      },
      id: '31a3d8a9-bea0-458f-9c24-3d39d4b929d6'
    }]
  },

  getZone: {
    zone: {
      status: 'Active',
      account: '6baa85ad-267f-44ff-b535-818b7d7a2467',
      name: 'system-test.',
      created: '2016-12-28T18:12:09Z',
      adminGroupId: '6baa85ad-267f-44ff-b535-818b7d7a2467',
      email: 'test@example.com',
      connection: {
        primaryServer: '127.0.0.1:5301',
        keyName: 'vinyl.',
        name: 'system-test.',
        key: 'OBF:1:B2cetOaRf1YAABAAek/w22XyKAleCRjA/hZO9fkNtNufPIRWTYHXviAk9GjrfcFOG9nNuB=='
      },
      transferConnection: {
        primaryServer: '127.0.0.1:5301',
        keyName: 'vinyl.',
        name: 'system-test.',
        key: 'OBF:1:PNt2k1nYkC0AABAAePpNMrDp+4C4GDbicWWlAqB5c4mKoKhvfpiWY1PfuRCVzSAeXydztB=='
      },
      shared: true,
      acl: {
        rules: []
      },
      id: '0f2fcece-b4ee-4982-b671-e5946f7db81d'
    }
  },

  getZoneChanges: {
    zoneChanges: [
      {
        status: 'Synced',
        zone: {
          status: 'Active',
          updated: '2016-12-30T15:37:57Z',
          name: 'system-test-history.',
          adminGroupId: '67b4da23-6832-4600-8450-9fa0664caeeb',
          created: '2016-12-30T15:37:56Z',
          account: '67b4da23-6832-4600-8450-9fa0664caeeb',
          email: 'i.changed.this.10.times@history-test.com',
          shared: true,
          acl: {
            rules: []
          },
          id: '9f353bc7-cb8d-491c-b074-34afafc97c5f'
        },
        created: '2016-12-30T15:37:57Z',
        changeType: 'Update',
        userId: 'history-id',
        id: '6d4deccb-4632-475e-9ebc-3f6bace5fe68'
      }
    ]
  },

  syncZone: {
    status: 'Pending',
    zone: {
      status: 'Syncing',
      updated: '2016-12-28T19:22:02Z',
      name: 'sync-test.',
      adminGroupId: 'cf00d1e4-46f1-493a-a3be-0ae79dd306a5',
      created: '2016-12-28T19:22:01Z',
      account: 'cf00d1e4-46f1-493a-a3be-0ae79dd306a5',
      email: 'test@test.com',
      shared: false,
      acl: {
        rules: []
      },
      id: '621a13df-a2e3-4394-84c0-3eb3a664dff4'
    },
    created: '2016-12-28T19:22:02Z',
    changeType: 'Sync',
    userId: 'ok',
    id: '03f1ee91-9053-4346-8b53-e0f6042600f2'
  },

  createZone: {
    status: 'Pending',
    zone: {
      status: 'Pending',
      account: 'test_group',
      name: 'dummy.',
      created: '2016-12-28T18:00:32Z',
      adminGroupId: 'test-group-id',
      email: 'test@test.com',
      shared: false,
      acl: {
        rules: []
      },
      id: '8ba20b72-cfdb-49d3-9216-9100aeaee7fc'
    },
    created: '2016-12-28T18:00:32Z',
    changeType: 'Create',
    userId: 'vinyl',
    id: 'dd449c27-bed5-4cd5-95e6-4c54fb20d930'
  },

  updateZone: {
    zone: {
      name: 'dummy.',
      email: 'update@update.com',
      status: 'Active',
      created: '2017-02-23T14:52:44Z',
      updated: '2017-02-23T19:23:26Z',
      id: '2467dc05-68eb-4498-a9d5-78d24bb0893c',
      account: '9b22b686-54bc-47fb-a8f8-cdc48e6d04ae',
      shared: false,
      acl: {
        rules: []
      },
      adminGroupId: '9b22b686-54bc-47fb-a8f8-cdc48e6d04ae',
      latestSync: '2017-02-23T19:05:33Z'
    },
    userId: '0215d410-9b7e-4636-89fd-b6b948a06347',
    changeType: 'Update',
    status: 'Pending',
    created: '2017-02-23T19:23:26Z',
    id: 'd1fcd28d-61fe-4c24-ac0b-4377d66d50db'
  },

  deleteZone: {
    status: 'Pending',
    zone: {
      status: 'Deleted',
      updated: '2016-12-28T18:45:53Z',
      name: '443ad9ff-8f38-4540-b53f-e23a35fdfc28.',
      adminGroupId: 'test-group-id',
      created: '2016-12-28T18:45:53Z',
      account: 'test_group',
      email: 'test@test.com',
      shared: false,
      acl: {
        rules: []
      },
      id: '4995e883-f314-4c5f-8ee8-75003ca08ab0'
    },
    created: '2016-12-28T18:45:53Z',
    changeType: 'Delete',
    userId: 'vinyl',
    id: '89c463e3-1615-42f7-8299-a0ca7ccea439'
  },

  getRecordSets: {
    recordSets: [{
      type: 'A',
      zoneId: '2467dc05-68eb-4498-a9d5-78d24bb0893c',
      name: 'some-record-set',
      ttl: 38400,
      status: 'Active',
      created: '2017-02-23T15:12:41Z',
      updated: '2017-02-23T15:12:41Z',
      records: [{
        address: '6.6.6.1'
      }],
      id: 'dd9c1120-0594-4e61-982e-8ddcbc8b2d21',
      account: '9b22b686-54bc-47fb-a8f8-cdc48e6d04ae',
      accessLevel: 'Delete'
    }]
  },

  getRecordSet: {
    type: 'A',
    zoneId: '2467dc05-68eb-4498-a9d5-78d24bb0893c',
    name: 'some-record-set',
    ttl: 38400,
    status: 'Active',
    created: '2017-02-23T15:12:41Z',
    updated: '2017-02-23T15:12:41Z',
    records: [{
      address: '6.6.6.1'
    }],
    id: 'dd9c1120-0594-4e61-982e-8ddcbc8b2d21',
    account: '9b22b686-54bc-47fb-a8f8-cdc48e6d04ae',
    accessLevel: 'Delete'
  },

  createRecordSet: {
    zone: {
      name: 'vinyl.',
      email: 'test@test.com',
      status: 'Active',
      created: '2017-02-23T14:52:44Z',
      id: '2467dc05-68eb-4498-a9d5-78d24bb0893c',
      account: '9b22b686-54bc-47fb-a8f8-cdc48e6d04ae',
      shared: false,
      acl: {
        rules: []
      },
      adminGroupId: '9b22b686-54bc-47fb-a8f8-cdc48e6d04ae'
    },
    recordSet: {
      type: 'A',
      zoneId: '2467dc05-68eb-4498-a9d5-78d24bb0893c',
      name: 'foo',
      ttl: 300,
      status: 'Pending',
      created: '2017-02-23T14:58:54Z',
      records: [{
        address: '10.10.10.10'
      }],
      id: '9a41b99c-8e67-445f-bcf3-f9c7cd1f2357',
      account: '0215d410-9b7e-4636-89fd-b6b948a06347'
    },
    userId: '0215d410-9b7e-4636-89fd-b6b948a06347',
    changeType: 'Create',
    status: 'Pending',
    created: '2017-02-23T14:58:54Z',
    id: 'fef81f0b-f439-462d-88df-c773d3686c9b'
  },

  deleteRecordSet: {
    zone: {
      name: 'vinyl.',
      email: 'test@test.com',
      status: 'Active',
      created: '2017-02-23T14:52:44Z',
      updated: '2017-02-23T15:12:33Z',
      id: '2467dc05-68eb-4498-a9d5-78d24bb0893c',
      account: '9b22b686-54bc-47fb-a8f8-cdc48e6d04ae',
      shared: false,
      acl: {
        rules: []
      },
      adminGroupId: '9b22b686-54bc-47fb-a8f8-cdc48e6d04ae',
      latestSync: '2017-02-23T15:12:33Z'
    },
    recordSet: {
      type: 'A',
      zoneId: '2467dc05-68eb-4498-a9d5-78d24bb0893c',
      name: 'foo',
      ttl: 38400,
      status: 'PendingDelete',
      created: '2017-02-23T15:12:33Z',
      updated: '2017-02-23T15:18:27Z',
      records: [{
        address: '2.2.2.2'
      }],
      id: 'da57c384-d6e8-4166-986d-2ca9d483f760',
      account: '9b22b686-54bc-47fb-a8f8-cdc48e6d04ae'
    },
    userId: '0215d410-9b7e-4636-89fd-b6b948a06347',
    changeType: 'Delete',
    status: 'Pending',
    created: '2017-02-23T15:18:27Z',
    updates: {
      type: 'A',
      zoneId: '2467dc05-68eb-4498-a9d5-78d24bb0893c',
      name: 'foo',
      ttl: 38400,
      status: 'Active',
      created: '2017-02-23T15:12:33Z',
      records: [{
        address: '2.2.2.2'
      }],
      id: 'da57c384-d6e8-4166-986d-2ca9d483f760',
      account: '9b22b686-54bc-47fb-a8f8-cdc48e6d04ae'
    },
    id: 'c46cf622-285f-4f1b-b5b2-993a5a51ea5b'
  },

  getRecordSetChanges: {
    recordSetChanges: [{
      status: 'Complete',
      zone: {
        status: 'Active',
        updated: '2016-12-30T15:37:57Z',
        name: 'system-test-history.',
        adminGroupId: '67b4da23-6832-4600-8450-9fa0664caeeb',
        created: '2016-12-30T15:37:56Z',
        account: '67b4da23-6832-4600-8450-9fa0664caeeb',
        email: 'i.changed.this.10.times@history-test.com',
        shared: true,
        acl: {
          rules: []
        },
        id: '9f353bc7-cb8d-491c-b074-34afafc97c5f'
      },
      created: '2016-12-30T15:37:58Z',
      recordSet: {
        status: 'Active',
        updated: '2016-12-30T15:37:58Z',
        name: 'test-create-cname-ok',
        created: '2016-12-30T15:37:57Z',
        account: 'history-id',
        zoneId: '9f353bc7-cb8d-491c-b074-34afafc97c5f',
        records: [{
          cname: 'changed-cname.'
        }],
        ttl: 200,
        type: 'CNAME',
        id: 'f62235df-5372-443c-9ba4-bdd3fca452f4'
      },
      changeType: 'Delete',
      userId: 'history-id',
      updates: {
        status: 'Active',
        updated: '2016-12-30T15:37:58Z',
        name: 'test-create-cname-ok',
        created: '2016-12-30T15:37:57Z',
        account: 'history-id',
        zoneId: '9f353bc7-cb8d-491c-b074-34afafc97c5f',
        records: [{
          cname: 'changed-cname.'
        }],
        ttl: 200,
        type: 'CNAME',
        id: 'f62235df-5372-443c-9ba4-bdd3fca452f4'
      },
      id: '68fd6dbe-0da8-4280-bcf3-37f54528dc41'
    }]
  },

  getRecordSetChange: {
    zone: {
      name: 'vinyl.',
      email: 'test@test.com',
      status: 'Active',
      created: '2017-02-23T14:52:44Z',
      id: '2467dc05-68eb-4498-a9d5-78d24bb0893c',
      account: '9b22b686-54bc-47fb-a8f8-cdc48e6d04ae',
      shared: false,
      acl: {
        rules: []
      },
      adminGroupId: '9b22b686-54bc-47fb-a8f8-cdc48e6d04ae'
    },
    recordSet: {
      type: 'A',
      zoneId: '2467dc05-68eb-4498-a9d5-78d24bb0893c',
      name: 'foo',
      ttl: 300,
      status: 'Pending',
      created: '2017-02-23T14:58:54Z',
      records: [{
        address: '10.10.10.10'
      }],
      id: '9a41b99c-8e67-445f-bcf3-f9c7cd1f2357',
      account: '0215d410-9b7e-4636-89fd-b6b948a06347'
    },
    userId: '0215d410-9b7e-4636-89fd-b6b948a06347',
    changeType: 'Create',
    status: 'Pending',
    created: '2017-02-23T14:58:54Z',
    id: 'fef81f0b-f439-462d-88df-c773d3686c9b'
  },

  updateRecordSet: {
    zone: {
      name: 'vinyl.',
      email: 'test@test.com',
      status: 'Active',
      created: '2017-02-23T14:52:44Z',
      id: '2467dc05-68eb-4498-a9d5-78d24bb0893c',
      account: '9b22b686-54bc-47fb-a8f8-cdc48e6d04ae',
      shared: false,
      acl: {
        rules: []
      },
      adminGroupId: '9b22b686-54bc-47fb-a8f8-cdc48e6d04ae'
    },
    recordSet: {
      type: 'A',
      zoneId: '2467dc05-68eb-4498-a9d5-78d24bb0893c',
      name: 'foo',
      ttl: 300,
      status: 'Pending',
      created: '2017-02-23T14:58:54Z',
      records: [{
        address: '10.10.10.10'
      }],
      id: '9a41b99c-8e67-445f-bcf3-f9c7cd1f2357',
      account: '0215d410-9b7e-4636-89fd-b6b948a06347'
    },
    userId: '0215d410-9b7e-4636-89fd-b6b948a06347',
    changeType: 'Create',
    status: 'Pending',
    created: '2017-02-23T14:58:54Z',
    id: 'fef81f0b-f439-462d-88df-c773d3686c9b'
  },

  getBatchChanges: {
    batchChanges: [{
      userId: 'vinyl',
      userName: 'vinyl201',
      comments: 'this is optional',
      createdTimestamp: '2018-05-11T18:12:13Z',
      totalChanges: 5,
      status: 'Complete',
      id: 'bd03175c-6fd7-419e-991c-3d5d1441d995'
    }]
  },

  getBatchChange: {
    userId: 'vinyl',
    userName: 'vinyl201',
    comments: 'this is optional',
    createdTimestamp: '2018-05-09T14:19:34Z',
    changes: [{
      changeType: 'Add',
      inputName: 'parent.com.',
      type: 'A',
      ttl: 200,
      record: {
        address: '4.5.6.7'
      },
      status: 'Pending',
      recordName: 'parent.com.',
      zoneName: 'parent.com.',
      zoneId: '74e93bfc-7296-4b86-83d3-1ffcb0eb3d13',
      recordChangeId: 'a07299ce-5f81-11e8-9c2d-fa7ae01bbebc',
      recordSetId: 'a0729f00-5f81-11e8-9c2d-fa7ae01bbebc',
      id: '7573ca11-3e30-45a8-9ba5-791f7d6ae7a7'
    }],
    status: 'Pending',
    id: '02bd95f4-a32c-443b-82eb-54dbaa55b31a'
  },

  createBatchChange: {
    userId: 'vinyl',
    userName: 'vinyl201',
    comments: 'this is optional',
    createdTimestamp: '2018-05-09T14:19:34Z',
    changes: [{
      changeType: 'Add',
      inputName: 'example.com.',
      type: 'A',
      ttl: 3600,
      record: {
        address: '1.1.1.1'
      },
      status: 'Pending',
      recordName: 'example.com.',
      zoneName: 'example.com.',
      zoneId: '74e93bfc-7296-4b86-83d3-1ffcb0eb3d13',
      recordChangeId: '255063ce-5f82-11e8-9c2d-fa7ae01bbebc',
      recordSetId: '25506676-5f82-11e8-9c2d-fa7ae01bbebc',
      id: '7573ca11-3e30-45a8-9ba5-791f7d6ae7a7'
    },{
      changeType: 'Add',
      inputName: '192.0.2.195',
      type: 'PTR',
      ttl: 3600,
      record: {
        ptrdname: 'ptrdata.data.'
      },
      status: 'Pending',
      recordName: '195',
      zoneName: '2.0.192.in-addr.arpa.',
      zoneId: '7fd52634-5a0c-11e8-9c2d-fa7ae01bbebc',
      recordChangeId: '25506a9a-5f82-11e8-9c2d-fa7ae01bbebc',
      recordSetId: '25506c84-5f82-11e8-9c2d-fa7ae01bbebc',
      id: 'bece5338-5a0c-11e8-9c2d-fa7ae01bbebc'
    }],
    status: 'Pending',
    id: '02bd95f4-a32c-443b-82eb-54dbaa55b31a'
  },

  getGroups: {
    maxItems: 100,
    groups: [
      {
        id: '93887728-2b26-4749-ba69-98871dda9cc0',
        name: 'some-other-group',
        email: 'test@example.com',
        created: '2017-03-02T16:23:07Z',
        status: 'Active',
        members: [
          {
            id: '2764183c-5e75-4ae6-8833-503cd5f4dcb0'
          }
        ],
        admins: [
          {
            id: '2764183c-5e75-4ae6-8833-503cd5f4dcb0'
          }
        ]
      }
    ]
  },

  getGroup: {
    id: '6f8afcda-7529-4cad-9f2d-76903f4b1aca',
    name: 'some-group',
    email: 'test@example.com',
    created: '2017-03-02T15:29:21Z',
    status: 'Active',
    members: [
      {
        id: '2764183c-5e75-4ae6-8833-503cd5f4dcb0'
      },
      {
        id: 'c8630ebc-0af2-4c9a-a0a0-d18c590ed03e'
      }
    ],
    admins: [
      {
        id: '2764183c-5e75-4ae6-8833-503cd5f4dcb0'
      }
    ]
  },

  getGroupActivity: {
    maxItems: 100,
    changes: [{
      newGroup: {
        status: 'Active',
        name: 'test-list-group-activity-max-item-success',
        created: '2017-03-02T18:49:58Z',
        id: '1555bac7-0343-4d11-800f-955afb481818',
        admins: [{
          id: 'ok'
        }],
        members: [{
          id: 'dummy199'
        },{
          id: 'ok'
        }],
        email: 'test@test.com'
      },
      created: '1488480605378',
      userId: 'some-user',
      changeType: 'Update',
      oldGroup: {
        status: 'Active',
        name: 'test-list-group-activity-max-item-success',
        created: '2017-03-02T18:49:58Z',
        id: '1555bac7-0343-4d11-800f-955afb481818',
        admins: [{
          id: 'ok'
        }],
        members: [{
          id: 'dummy198'
        },{
          id: 'ok'
        }],
        email: 'test@test.com'
      },
      id: '11abb88b-c47d-469b-bc2d-6656e00711cf',
      userName: 'some-user',
      groupChangeMessage: 'Group member/s with user name/s \'dummy198\' removed. Group member/s with user name/s \'dummy199\' added.'
    }]
  },

  getGroupChange: {
    newGroup: {
      status: 'Active',
      name: 'test-list-group-activity-max-item-success',
      created: '2017-03-02T18:49:58Z',
      id: '1555bac7-0343-4d11-800f-955afb481818',
      admins: [{
        id: 'ok'
      }],
      members: [{
        id: 'dummy199'
      },{
        id: 'ok'
      }],
      email: 'test@test.com'
    },
    created: '1488480605378',
    userId: 'some-user',
    changeType: 'Update',
    oldGroup: {
      status: 'Active',
      name: 'test-list-group-activity-max-item-success',
      created: '2017-03-02T18:49:58Z',
      id: '1555bac7-0343-4d11-800f-955afb481818',
      admins: [{
        id: 'ok'
      }],
      members: [{
        id: 'dummy198'
      },{
        id: 'ok'
      }],
      email: 'test@test.com'
    },
    id: '11abb88b-c47d-469b-bc2d-6656e00711cf',
    userName: 'some-user',
    groupChangeMessage: 'Group member/s with user name/s \'dummy198\' removed. Group member/s with user name/s \'dummy199\' added.'
  },

  getGroupAdmins: {
    admins: [{
      userName: 'jdoe201',
      firstName: 'john',
      created: '2017-03-02T16:39:02Z',
      lastName: 'doe',
      email: 'john_doe@example.com',
      id: '2764183c-5e75-4ae6-8833-503cd5f4dcb0'
    }]
  },

  getGroupMembers: {
    members: [{
      userName: 'jdoe201',
      firstName: 'john',
      created: '2017-03-02T16:39:02Z',
      lastName: 'doe',
      email: 'john_doe@example.com',
      id: '2764183c-5e75-4ae6-8833-503cd5f4dcb0'
    }]
  },

  createGroup: {
    id: '6f8afcda-7529-4cad-9f2d-76903f4b1aca',
    name: 'some-group',
    email: 'test@example.com',
    description: 'an example group',
    created: '2017-03-02T15:29:21Z',
    status: 'Active',
    members: [
      {
        id: '2764183c-5e75-4ae6-8833-503cd5f4dcb0'
      }
    ],
    admins: [
      {
        id: '2764183c-5e75-4ae6-8833-503cd5f4dcb0'
      }
    ]
  },

  updateGroup: {
    id: '6f8afcda-7529-4cad-9f2d-76903f4b1aca',
    name: 'some-group',
    email: 'test@example.com',
    description: 'an example group',
    created: '2017-03-02T15:29:21Z',
    status: 'Active',
    members: [
      {
        id: '2764183c-5e75-4ae6-8833-503cd5f4dcb0'
      }
    ],
    admins: [
      {
        id: '2764183c-5e75-4ae6-8833-503cd5f4dcb0'
      }
    ]
  },

  deleteGroup: {
    id: '6f8afcda-7529-4cad-9f2d-76903f4b1aca',
    name: 'some-group',
    email: 'test@example.com',
    created: '2017-03-02T15:29:21Z',
    status: 'Deleted',
    members: [
      {
        id: '2764183c-5e75-4ae6-8833-503cd5f4dcb0'
      },
      {
        id: 'c8630ebc-0af2-4c9a-a0a0-d18c590ed03e'
      }
    ],
    admins: [
      {
        id: '2764183c-5e75-4ae6-8833-503cd5f4dcb0'
      }
    ]
  }
};
