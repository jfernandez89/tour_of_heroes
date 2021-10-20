import { InjectionToken } from '@angular/core';
import { Env } from '../types/env';

export const ENV = new InjectionToken<Env>('ENV');
