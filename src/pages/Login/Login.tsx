import styles from './Login.module.css'
import { useId } from 'react'
import { LoginRequest, LoginRequestSchema } from '@/schemas/Login.ts'
import { useAppDispatch } from '@/hooks/useAppDispatch.ts'
import { Navigate } from 'react-router-dom'
import { Loader } from '@/components/Loader'
import { useLoginMutation } from '@/services/auth.ts'
import { selectCurrentUser, setCredentials } from '@/store/auth/authSlice.ts'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAppSelector } from '@/hooks/useAppSelector.ts'
import { Button } from '../../components/ui/button'

export const Login = () => {
  const id = useId()
  const dispatch = useAppDispatch()

  const user = useAppSelector(selectCurrentUser)
  const [login, { isLoading, error }] = useLoginMutation()

  const { handleSubmit, control } = useForm<LoginRequest>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
    resolver: zodResolver(LoginRequestSchema),
  })

  const onSubmit: SubmitHandler<LoginRequest> = (data) => {
    login(data)
      .unwrap()
      .then((data) => {
        dispatch(setCredentials(data))
      })
      .catch((error) => {
        console.log('Error.', error)
      })
  }

  if (user) {
    return <Navigate to={'/'} />
  }
  if (isLoading) {
    return <Loader />
  }
  if (error) {
    return <h1>Error</h1>
  }
  return (
    <div className={styles.loginPage}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name={'email'}
          control={control}
          render={({ field, fieldState }) => (
            <div>
              <label htmlFor={`email-${id}`}>Email</label>
              <input
                {...field}
                id={`email-${id}`}
                name={'email'}
                type='email'
                autoComplete={'username'}
                placeholder={'user@gmail.com'}
              />
              {fieldState.error && <span>Invalid email</span>}
            </div>
          )}
        />
        <Controller
          name={'password'}
          control={control}
          render={({ field, fieldState }) => (
            <div>
              <label htmlFor={`password-${id}`}>Password</label>
              <input
                {...field}
                id={`password-${id}`}
                name={'password'}
                type='password'
                autoComplete={'password'}
                placeholder={'****'}
              />
              {fieldState.error && <span>Incorrect password</span>}
            </div>
          )}
        />
        <Button type={'submit'}>Login</Button>
      </form>
    </div>
  )
}
