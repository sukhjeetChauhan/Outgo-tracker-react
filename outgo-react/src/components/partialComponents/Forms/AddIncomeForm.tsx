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
import CloseModalButton from '../buttons/CloseModalButton'
import { useCreateIncome } from '../../../apis/Income/useIncome'
import { useSelector } from 'react-redux'
import { RootState } from '../../../Redux/store'
import {
  useProjectById,
  useUpdateProject,
} from '../../../apis/Project/useProjects'

interface Income {
  name: string
  description?: string
  amount: number
  incomeType: TransactionType
  timeframe?: Timeframe
  date: string // ISO String
}

interface AddIncomeFormProps {
  setShowModal: (value: boolean) => void
  setIncomeForm: (value: boolean) => void
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

const AddIncomeForm = ({ setShowModal, setIncomeForm }: AddIncomeFormProps) => {
  const { mutate: createIncome, isPending } = useCreateIncome()
  const { id, defaultProjectId } = useSelector((state: RootState) => ({
    id: state.user.id,
    defaultProjectId: state.user.defaultProjectId,
  }))
  const { data: project } = useProjectById(defaultProjectId)
  const { mutate: updateProject } = useUpdateProject()

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
    if (id && defaultProjectId) {
      const postData = {
        ...data,
        userId: id,
        projectId: defaultProjectId,
      }

      const updatedProject = {
        ...project,
        savings: project.savings + data.amount,
      }

      try {
        await createIncome(postData)
        await updateProject({ id: defaultProjectId, project: updatedProject })
        message.success('Income added successfully')
        reset()
        setShowModal(false)
        setIncomeForm(false)
      } catch (error) {
        console.error('Error adding income:', error)
        message.error('Error adding income')
      }
    }
  }

  return (
    <div className="rounded-lg bg-white px-4 py-8 shadow-md w-4/5 sm:w-1/3 relative">
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
                <Select.Option value="OneOff">OneOff</Select.Option>
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
          <Button
            color="cyan"
            variant="solid"
            htmlType="submit"
            loading={isPending}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>

      {/*close Button  */}
      <CloseModalButton
        CloseFunction={() => {
          setShowModal(false)
          setIncomeForm(false)
        }}
      />
    </div>
  )
}

export default AddIncomeForm
