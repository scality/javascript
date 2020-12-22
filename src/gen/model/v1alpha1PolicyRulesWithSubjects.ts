/**
 * Kubernetes
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v1.19.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { RequestFile } from '../api';
import { FlowcontrolV1alpha1Subject } from './flowcontrolV1alpha1Subject';
import { V1alpha1NonResourcePolicyRule } from './v1alpha1NonResourcePolicyRule';
import { V1alpha1ResourcePolicyRule } from './v1alpha1ResourcePolicyRule';

/**
* PolicyRulesWithSubjects prescribes a test that applies to a request to an apiserver. The test considers the subject making the request, the verb being requested, and the resource to be acted upon. This PolicyRulesWithSubjects matches a request if and only if both (a) at least one member of subjects matches the request and (b) at least one member of resourceRules or nonResourceRules matches the request.
*/
export class V1alpha1PolicyRulesWithSubjects {
    /**
    * `nonResourceRules` is a list of NonResourcePolicyRules that identify matching requests according to their verb and the target non-resource URL.
    */
    'nonResourceRules'?: Array<V1alpha1NonResourcePolicyRule>;
    /**
    * `resourceRules` is a slice of ResourcePolicyRules that identify matching requests according to their verb and the target resource. At least one of `resourceRules` and `nonResourceRules` has to be non-empty.
    */
    'resourceRules'?: Array<V1alpha1ResourcePolicyRule>;
    /**
    * subjects is the list of normal user, serviceaccount, or group that this rule cares about. There must be at least one member in this slice. A slice that includes both the system:authenticated and system:unauthenticated user groups matches every request. Required.
    */
    'subjects': Array<FlowcontrolV1alpha1Subject>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "nonResourceRules",
            "baseName": "nonResourceRules",
            "type": "Array<V1alpha1NonResourcePolicyRule>"
        },
        {
            "name": "resourceRules",
            "baseName": "resourceRules",
            "type": "Array<V1alpha1ResourcePolicyRule>"
        },
        {
            "name": "subjects",
            "baseName": "subjects",
            "type": "Array<FlowcontrolV1alpha1Subject>"
        }    ];

    static getAttributeTypeMap() {
        return V1alpha1PolicyRulesWithSubjects.attributeTypeMap;
    }
}

