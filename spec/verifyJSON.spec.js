import verifyJSON from '../src/verifyJSON.js'
import correctCase from './testCases/correctCase.json' with {type: 'json'}
import shortestCorrectPolicyName from './testCases/shortestCorrectPolicyName.json' with {type: 'json'}
import longestCorrectPolicyName from './testCases/longestCorrectPolicyName.json' with {type: 'json'}
import emptyJSON from './testCases/emptyJSON.json' with {type: 'json'}
import onlyPolicyName from './testCases/onlyPolicyName.json' with {type: 'json'}
import onlyPolicyDocument from './testCases/onlyPolicyDocument.json' with {type: 'json'}
import wrongPolicyNameType from './testCases/wrongPolicyNameType.json' with {type: 'json'}
import wrongPolicyDocumentType from './testCases/wrongPolicyDocumentType.json' with {type: 'json'}
import wrongPolicyNamePattern from './testCases/wrongPolicyNamePattern.json' with {type: 'json'}
import policyNameTooShort from './testCases/policyNameTooShort.json' with {type: 'json'}
import policyNameTooLong from './testCases/policyNameTooLong.json' with {type: 'json'}
import resourceWithAsterisk from './testCases/resourceWithAsterisk.json' with {type: 'json'}
import withoutResource from './testCases/withoutResource.json' with {type: 'json'}
import withoutStatement from './testCases/withoutStatement.json' with {type: 'json'}

describe("Verifying JSON data:",
    () => {
        describe("Correct cases:",
            () => {
                it("first correct case",
                    () => {
                        expect(correctCase['PolicyName'].length).toBeGreaterThanOrEqual(1);
                        expect(correctCase['PolicyName'].length).toBeLessThanOrEqual(128);
                        expect(typeof correctCase['PolicyName']).toBe('string')
                        const resource = correctCase['PolicyDocument']['Statement'].find(el => el['Resource'])['Resource']
                        expect(resource).not.toEqual('*');
                        expect(verifyJSON(correctCase)).toBeTrue();
                    });
                it("shortest correct PolicyName",
                    () => {
                        expect(shortestCorrectPolicyName['PolicyName'].length).toBe(1);
                        expect(verifyJSON(shortestCorrectPolicyName)).toBeTrue();
                    });
                it("longest correct PolicyName",
                    () => {
                        expect(longestCorrectPolicyName['PolicyName'].length).toBe(128);
                        expect(verifyJSON(longestCorrectPolicyName)).toBeTrue();
                    });
            }
        ),
        describe("Incorrect cases:",
            () => {
                it("empty JSON",
                    () => {
                        expect(emptyJSON).toEqual({});
                        expect(verifyJSON(emptyJSON)).toBeFalse();
                    });
                it("null input",
                    () => {
                        expect(verifyJSON(null)).toBeFalse();
                    });
                it("only PolicyName key",
                    () => {
                        expect(onlyPolicyName['PolicyName'].length).toBeGreaterThanOrEqual(1);
                        expect(onlyPolicyName['PolicyName'].length).toBeLessThanOrEqual(128);
                        expect(onlyPolicyName['PolicyDocument']).toBeUndefined();
                        expect(verifyJSON(onlyPolicyName)).toBeFalse();
                    });
                it("only PolicyDocument key",
                    () => {
                        expect(onlyPolicyDocument['PolicyName']).toBeUndefined();
                        expect(onlyPolicyDocument['PolicyDocument']).toBeDefined();
                        expect(verifyJSON(onlyPolicyDocument)).toBeFalse();
                    })
                it("wrong PolicyName type",
                    () => {
                        expect(wrongPolicyNameType['PolicyName']).toBeDefined();
                        expect(typeof wrongPolicyNameType['PolicyName']).not.toBe('string');
                        expect(verifyJSON(wrongPolicyNameType)).toBeFalse();
                    })
                it("wrong PolicyDocument type",
                    () => {
                        expect(wrongPolicyDocumentType['PolicyDocument']).toBeDefined();
                        expect(typeof wrongPolicyDocumentType['PolicyDocument']).not.toBe('object');
                        expect(verifyJSON(wrongPolicyDocumentType)).toBeFalse();
                    })
                it("wrong PolicyName pattern",
                    () => {
                        expect(typeof wrongPolicyNamePattern['PolicyName']).toBe('string');
                        expect(wrongPolicyNamePattern['PolicyName']).not.toMatch(/[\w+=,.@-]+/gi);
                        expect(wrongPolicyNamePattern['PolicyName'].length).toBeGreaterThanOrEqual(1);
                        expect(wrongPolicyNamePattern['PolicyName'].length).toBeLessThanOrEqual(128);
                        expect(verifyJSON(wrongPolicyNamePattern)).toBeFalse();
                    })
                it("PolicyName too short",
                    () => {
                        expect(policyNameTooShort['PolicyName']).toBeDefined();
                        expect(policyNameTooShort['PolicyName'].length).toBeLessThan(1);
                        expect(verifyJSON(policyNameTooShort)).toBeFalse();
                    })
                it("PolicyName too long",
                    () => {
                        expect(policyNameTooLong['PolicyName']).toBeDefined();
                        expect(policyNameTooLong['PolicyName'].length).toBeGreaterThan(128);
                        expect(verifyJSON(policyNameTooLong)).toBeFalse();
                    })
                it("Resource with single asterisk",
                    () => {
                        const resource = resourceWithAsterisk['PolicyDocument']['Statement'].find(el => el['Resource'])['Resource']
                        expect(resource).toBeDefined();
                        expect(resource).toEqual('*');
                        expect(verifyJSON(resourceWithAsterisk)).toBeFalse();
                    })
                it("without Resource",
                    () => {
                        expect(withoutResource['PolicyDocument']['Statement']).toBeDefined();
                        const resource = withoutResource['PolicyDocument']['Statement'].find(el => el['Resource'])
                        expect(resource).toBeUndefined();
                        expect(verifyJSON(withoutResource)).toBeFalse();
                    })
                it("without Statement",
                    () => {
                        expect(withoutStatement['PolicyDocument']).toBeDefined();
                        expect(withoutStatement['PolicyDocument']['Statement']).toBeUndefined();
                        expect(verifyJSON(withoutStatement)).toBeFalse();
                    })
            },
        );
    }
);