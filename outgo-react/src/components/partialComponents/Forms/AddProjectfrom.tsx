import { Button, Form, Input, InputNumber, Select, message } from 'antd'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Timeframe } from '../../../Types/enums'
import CloseModalButton from '../buttons/CloseModalButton'

interface Project {
  name: string
  description: string
  budget: number
  savings: number
  budgetTimeframe: Timeframe
}

interface AddProjectFormProps {
  setShowModal: (value: boolean) => void
  setProjectForm: (value: boolean) => void
}

// Validation Schema
const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
  budget: yup
    .number()
    .positive('Budget must be positive')
    .required('Budget is required'),
  savings: yup
    .number()
    .min(0, 'Savings cannot be negative')
    .required('Savings is required'),
  budgetTimeframe: yup
    .mixed<Timeframe>()
    .oneOf([
      Timeframe.Weekly,
      Timeframe.Monthly,
      Timeframe.Yearly,
      Timeframe.Quarterly,
      Timeframe.HalfYearly,
    ])
    .required('Budget timeframe is required'),
})

const AddProjectForm = ({
  setShowModal,
  setProjectForm,
}: AddProjectFormProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<Project>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      description: '',
      budget: 0,
      savings: 0,
      budgetTimeframe: undefined,
    },
  })

  const onSubmit = async (data: Project) => {
    try {
      const response = await fetch('/api/project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        message.success('Project added successfully!')
        reset()
      } else {
        throw new Error('Failed to submit')
      }
    } catch (error) {
      message.error('Error submitting project')
      console.error(error)
    }
  }

  return (
    <div className="rounded-lg bg-white px-4 py-8 shadow-md w-1/3 relative">
      <h2 className="text-teal-500 text-xl font-bold mb-6">Project Details</h2>
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
          label="Budget"
          validateStatus={errors.budget ? 'error' : ''}
          help={errors.budget?.message}
        >
          <Controller
            name="budget"
            control={control}
            render={({ field }) => (
              <InputNumber {...field} min={0} style={{ width: '100%' }} />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Savings"
          validateStatus={errors.savings ? 'error' : ''}
          help={errors.savings?.message}
        >
          <Controller
            name="savings"
            control={control}
            render={({ field }) => (
              <InputNumber {...field} min={0} style={{ width: '100%' }} />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Budget Timeframe"
          validateStatus={errors.budgetTimeframe ? 'error' : ''}
          help={errors.budgetTimeframe?.message}
        >
          <Controller
            name="budgetTimeframe"
            control={control}
            render={({ field }) => (
              <Select {...field} placeholder="Select timeframe">
                <Select.Option value="Weekly">Weekly</Select.Option>
                <Select.Option value="Monthly">Monthly</Select.Option>
                <Select.Option value="Quarterly">Quarterly</Select.Option>
                <Select.Option value="HalfYearly">HalfYearly</Select.Option>
                <Select.Option value="Yearly">Yearly</Select.Option>
              </Select>
            )}
          />
        </Form.Item>

        <Form.Item>
          <Button color="cyan" variant="solid" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

      {/* Close Button */}
      <CloseModalButton
        CloseFunction={() => {
          setShowModal(false)
          setProjectForm(false)
        }}
      />
    </div>
  )
}

export default AddProjectForm
