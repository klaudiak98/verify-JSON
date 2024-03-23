# Verify JSON

Function verifying the input JSON data.
Input data formate is defined as **[AWS::IAM:Role Policy](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iam-role-policy.html)**.

## verifyJSON() function

> Path: ./src/verifyJSON.js

The **verifyJSON()** function verifies if the input is JSON data.

The data formate is defined as [AWS::IAM:Role Policy](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iam-role-policy.html).
In this case, it is required that the **Resource** field **is not** a single asterisk (\*).

The function returns **true** if the input is valid and **false** otherwise.

### AWS::IAM:Role Policy

_Source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iam-role-policy.html_

Required fields:

- PolicyName
  - type: _string_
  - pattern: [\w+=,.@-]+
  - min length: 1
  - max length: 128
- PolicyDocument:
  - type: _JSON_

### Example valid case

```json
{
  "PolicyName": "root",
  "PolicyDocument": {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "IamListAccess",
        "Effect": "Allow",
        "Action": ["iam:ListRoles", "iam:ListUsers"],
        "Resource": "arn:aws:s3:::examplebucket/*"
      }
    ]
  }
}
```

### Example invalid case

```json
{
  "PolicyName": "root",
  "PolicyDocument": {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "IamListAccess",
        "Effect": "Allow",
        "Action": ["iam:ListRoles", "iam:ListUsers"],
        "Resource": "*"
      }
    ]
  }
}
```

## Unit tests

> ./spec/verifyJSON.spec.js - main test file

> ./spec/testCases - directory with test cases (JSON files)

Unit tests are implemented with **Jasmine**.

## How to run

Run these commands in the Terminal at the root path of the repository package:

```sh
npm install && npm test
```

### Requirements

Node.js >= v20.10.0
