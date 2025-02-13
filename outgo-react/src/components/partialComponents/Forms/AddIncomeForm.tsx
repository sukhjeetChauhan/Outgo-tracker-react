import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  DatePicker,
  message,
} from 'antd'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import dayjs from 'dayjs'
import { Timeframe, TransactionType } from '../../../Types/enums'

interface Income {
  name: string
  description?: string
  amount: number
  incomeType: TransactionType
  timeframe?: Timeframe
  date: string // ISO String
}

// Validation Schema
const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string(),
  amount: yup
    .number()
    .positive('Amount must be positive')
    .required('Amount is required'),
  incomeType: yup
    .mixed<TransactionType>()
    .oneOf([TransactionType.OneOff, TransactionType.Recurring])
    .required('Income type is required'),
  timeframe: yup
    .mixed<Timeframe>()
    .oneOf([
      Timeframe.Weekly,
      Timeframe.Monthly,
      Timeframe.Yearly,
      Timeframe.Quarterly,
      Timeframe.HalfYearly,
    ])
    .optional(),
  date: yup.string().required('Date is required'),
})

const IncomeForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<Income>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      description: '',
      amount: 0,
      incomeType: undefined,
      timeframe: undefined,
      date: dayjs().toISOString(), // Default to today
    },
  })

  const onSubmit = async (data: Income) => {
    try {
      const response = await fetch('/api/income', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      ///need to modify this with actual api

      if (response.ok) {
        message.success('Income added successfully!')
        reset()
      } else {
        throw new Error('Failed to submit')
      }
    } catch (error) {
      message.error('Error submitting income')
      console.error(error)
    }
  }

  return (
    <div className="rounded-lg bg-white px-4 py-8 shadow-md w-1/3">
      <h2 className="text-teal-500 text-xl font-bold mb-6">Income Details</h2>
      <Form layout="horizontal" onFinish={handleSubmit(onSubmit)}>
        <Form.Item
          label="Name"
          validateStatus={errors.name ? 'error' : ''}
          help={errors.name?.message}
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>

        <Form.Item
          label="Description"
          validateStatus={errors.description ? 'error' : ''}
          help={errors.description?.message}
        >
          <Controller
            name="description"
            control={control}
            render={({ field }) => <Input.TextArea {...field} />}
          />
        </Form.Item>

        <Form.Item
          label="Amount"
          validateStatus={errors.amount ? 'error' : ''}
          help={errors.amount?.message}
        >
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <InputNumber {...field} min={0} style={{ width: '100%' }} />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Income Type"
          validateStatus={errors.incomeType ? 'error' : ''}
          help={errors.incomeType?.message}
        >
          <Controller
            name="incomeType"
            control={control}
            render={({ field }) => (
              <Select {...field} placeholder="Select income type">
                <Select.Option value="Oneoff">Oneoff</Select.Option>
                <Select.Option value="Recurring">Recurring</Select.Option>
              </Select>
            )}
          />
        </Form.Item>

        <Form.Item
          label="Timeframe"
          validateStatus={errors.timeframe ? 'error' : ''}
          help={errors.timeframe?.message}
        >
          <Controller
            name="timeframe"
            control={control}
            render={({ field }) => (
              <Select {...field} placeholder="Select timeframe" allowClear>
                <Select.Option value="Weekly">Weekly</Select.Option>
                <Select.Option value="Monthly">Monthly</Select.Option>
                <Select.Option value="Quarterly">Quarterly</Select.Option>
                <Select.Option value="HalfYearly">HalfYearly</Select.Option>
                <Select.Option value="Yearly">Yearly</Select.Option>
              </Select>
            )}
          />
        </Form.Item>

        <Form.Item
          label="Date"
          validateStatus={errors.date ? 'error' : ''}
          help={errors.date?.message}
        >
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                value={field.value ? dayjs(field.value) : null} // Convert ISO string to Dayjs for controlled value
                onChange={(date) =>
                  field.onChange(date ? date.toISOString() : '')
                } // Convert Dayjs to ISO string
                style={{ width: '100%' }}
              />
            )}
          />
        </Form.Item>

        <Form.Item>
          <Button color="cyan" variant="solid" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default IncomeForm
