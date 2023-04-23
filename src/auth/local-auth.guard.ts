import { Controller, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class LocalAuthGaurd extends AuthGuard('local') {}
