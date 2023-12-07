import validator from 'validator';
import { TypeOf, z } from 'zod';

export const loginSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Wrong email format'),
    password: z.string().min(1, 'Password is required')
});

export const refreshTokenSchema = z.object({
    refreshToken: z.string().min(1, 'Refresh token is required.')
});

export const registerSchema = z
    .object({
        email: z.string().min(1, 'Email is required.').email('Invalid email address.'),
        name: z.string().min(1, 'Username is required'),
        password: z
            .string()
            .min(1, 'Password is required.')
            .refine(
                value => validator.isStrongPassword(value),
                // eslint-disable-next-line max-len
                'Password must have minimum 8 characters, including one lowercase letter, an uppercase letter, a number and a special character.'
            ),
        passwordConfirm: z.string().min(1, 'Password confirmation is required.')
    })
    .refine(data => data.password === data.passwordConfirm, 'Passwords are different.');

export type LoginSchema = TypeOf<typeof loginSchema>;
export type RefreshTokenSchema = TypeOf<typeof refreshTokenSchema>;
export type RegisterSchema = TypeOf<typeof registerSchema>;
