/* eslint-disable @typescript-eslint/ban-ts-comment,filenames/match-exported */
import { MathArray, Matrix, Unit } from 'mathjs';
// @ts-ignore
import { create } from 'mathjs/lib/core/create';
// @ts-ignore
import { UnitDependencies } from 'mathjs/lib/entry/dependenciesAny/dependenciesUnitClass.generated';

const mathjs = create({ UnitDependencies });
export default mathjs;

export function unit(unitParam: string): Unit;
export function unit(value: number | MathArray | Matrix, unitParam: string): Unit;

export function unit(...params: unknown[]) {
    return new mathjs.Unit(...params);
}
