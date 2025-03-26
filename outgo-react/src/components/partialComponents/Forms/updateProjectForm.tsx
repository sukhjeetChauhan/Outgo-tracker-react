import { Button, Form, Input, InputNumber, Select, message } from 'antd'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Timeframe } from '../../../Types/enums'
import CloseModalButton from '../buttons/CloseModalButton'
import {
  useProjectById,
  useUpdateProject,
} from '../../../apis/Project/useProjects'
import { useSelector } from 'react-redux'

import { RootState } from '../../../Redux/store'

interface Project {
  name: string
  description: string
  budget: number
  savings: number
  budgetTimeframe: Timeframe
}

interface UpdateProjectFormProps {
  setShowModal: (value: boolean) => void
  setUpdateForm: (value: boolean) => void
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

const UpdateProjectForm = ({
  setShowModal,
  setUpdateForm,
}: UpdateProjectFormProps) => {
  const { defaultProjectId } = useSelector((state: RootState) => ({
    id: state.user.id,
    firstName: state.user.firstName,
    lastName: state.user.lastName || '', // Provide a default value if lastName is undefined
    defaultProjectId: state.user.defaultProjectId,
  }))
  const { mutate: updateProject, isPending } = useUpdateProject()

  const { data: projectItem } = useProjectById(defaultProjectId)

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<Project>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: projectItem?.name || '',
      description: projectItem?.description || '',
      budget: projectItem?.budget || 0,
      savings: projectItem?.savings || 0,
      budgetTimeframe: projectItem?.budgetTimeframe || Timeframe.Weekly,
    },
  })

  const onSubmit = (data: Project) => {
    const updatedData = {
      ...data,
      id: defaultProjectId,
    }
    updateProject(
      { id: defaultProjectId, project: updatedData },
      {
        onSuccess: () => {
          message.success('Project updated successfully')

          reset()
          setShowModal(false)
          setUpdateForm(false)
        },
        onError: () => {
          message.error('Failed to update project')
        },
      }
    )
  }

  return (
    <div className="rounded-lg bg-white px-4 py-8 shadow-md w-4/5 sm:w-1/3 relative">
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
          <Button
            color="cyan"
            variant="solid"
            htmlType="submit"
            loading={isPending}
          >
            Update
          </Button>
        </Form.Item>
      </Form>

      {/* Close Button */}
      <CloseModalButton
        CloseFunction={() => {
          setShowModal(false)
          setUpdateForm(false)
        }}
      />
    </div>
  )
}

export default UpdateProjectForm
