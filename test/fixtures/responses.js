module.exports = {
  getZones: {
    "zones": [{
      "status": "Active",
      "account": "a0b5ea74-cc05-4932-a294-9bf935d52744",
      "name": "list-zones-test-searched-1.",
      "created": "2016-12-16T15:21:47Z",
      "adminGroupId": "a0b5ea74-cc05-4932-a294-9bf935d52744",
      "email": "test@test.com",
      "shared": false,
      "acl": {
        "rules": []
      },
      "id": "31a3d8a9-bea0-458f-9c24-3d39d4b929d6"
    }]
  },

  getZone: {
    "zone": {
      "status": "Active",
      "account": "6baa85ad-267f-44ff-b535-818b7d7a2467",
      "name": "system-test.",
      "created": "2016-12-28T18:12:09Z",
      "adminGroupId": "6baa85ad-267f-44ff-b535-818b7d7a2467",
      "email": "test@example.com",
      "connection": {
        "primaryServer": "127.0.0.1:5301",
        "keyName": "vinyl.",
        "name": "system-test.",
        "key": "OBF:1:B2cetOaRf1YAABAAek/w22XyKAleCRjA/hZO9fkNtNufPIRWTYHXviAk9GjrfcFOG9nNuB=="
      },
      "transferConnection": {
        "primaryServer": "127.0.0.1:5301",
        "keyName": "vinyl.",
        "name": "system-test.",
        "key": "OBF:1:PNt2k1nYkC0AABAAePpNMrDp+4C4GDbicWWlAqB5c4mKoKhvfpiWY1PfuRCVzSAeXydztB=="
      },
      "shared": true,
      "acl": {
        "rules": []
      },
      "id": "0f2fcece-b4ee-4982-b671-e5946f7db81d"
    }
  },

  createZone: {
    "status": "Pending",
    "zone": {
      "status": "Pending",
      "account": "test_group",
      "name": "dummy.",
      "created": "2016-12-28T18:00:32Z",
      "adminGroupId": "test-group-id",
      "email": "test@test.com",
      "shared": false,
      "acl": {
        "rules": []
      },
      "id": "8ba20b72-cfdb-49d3-9216-9100aeaee7fc"
    },
    "created": "2016-12-28T18:00:32Z",
    "changeType": "Create",
    "userId": "vinyl",
    "id": "dd449c27-bed5-4cd5-95e6-4c54fb20d930"
  }
};
