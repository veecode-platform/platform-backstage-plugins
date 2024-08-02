/*
Naming rules for relations in priority order:

1. Use at most two words. One main verb and a specifier, e.g. "ownerOf"
2. Reading out "<source-kind> <type> <target-kind>" should make sense in English.
3. Maintain symmetry between pairs, e.g. "ownedBy" and "ownerOf" rather than "owns".
*/

/**
 * Reversed direction of {@link RELATION_ENVIRONMENT_OF}.
 * 
 *
 * @public
 */
export const RELATION_FROM_ENVIRONMENT = 'fromEnvironment';

/**
 * A relationship from an environment to it's clusters. Reversed direction of
 * {@link RELATION_FROM_ENVIRONMENT}.
 *
 * @public
 */
export const RELATION_ENVIRONMENT_OF = 'environmentOf';