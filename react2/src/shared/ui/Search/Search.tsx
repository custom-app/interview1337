import {FC} from 'react';
import {Input} from '@mui/material';
import {ControllerProps} from 'react-hook-form';

export const Search: FC<{
  onChange: any,
  value: any
  controllerProps: Omit<ControllerProps<any, any>, 'render'>
}> = ({onChange, value, controllerProps}) => {
  return (
    <div>
      <Input value={onChange(value)} {...controllerProps} />
      <span className='error'>
        {controllerProps.control?._formState?.errors?.[controllerProps.name]?.message?.toString()}
      </span>
    </div>
  )
}
