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
import { Timeframe, TransactionType, Category } from '../../../Types/enums'
import CloseModalButton from '../buttons/CloseModalButton'
import { useCreateExpense } from '../../../apis/Expenses/useExpenses'
import { useSelector } from 'react-redux'
import { RootState } from '../../../Redux/store'
import {
  useProjectById,
  useUpdateProject,
} from '../../../apis/Project/useProjects'

interface AddExpenseFormProps {
  setShowModal: (value: boolean) => void
  setExpenseForm: (value: boolean) => void
}

interface Expense {
  name: string
  description?: string
  amount: number
  expenseType: TransactionType
  timeframe?: Timeframe
  date: string // ISO String
  category: Category
}

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string(),
  amount: yup
    .number()
    .positive('Amount must be positive')
    .required('Amount is required'),
  expenseType: yup
    .mixed<TransactionType>()
    .oneOf([TransactionType.OneOff, TransactionType.Recurring])
    .required('Expense type is required'),
  timeframe: yup
    .mixed<Timeframe>()
    .oneOf(
      [
        Timeframe.Weekly,
        Timeframe.Monthly,
        Timeframe.Yearly,
        Timeframe.Quarterly,
        Timeframe.HalfYearly,
      ],
      'Invalid timeframe'
    )
    .optional(),
  date: yup.string().required('Date is required'),
  category: yup
    .mixed<Category>()
    .oneOf(Object.values(Category))
    .required('Category is required'),
})

const AddExpenseForm = ({
  setShowModal,
  setExpenseForm,
}: AddExpenseFormProps) => {
  const { mutate: createExpense, isPending } = useCreateExpense()
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
  } = useForm<Expense>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      description: '',
      amount: 0,
      expenseType: undefined,
      timeframe: undefined,
      date: dayjs().toISOString(),
      category: undefined,
    },
  })

  const onSubmit = async (data: Expense) => {
    if (id && defaultProjectId) {
      const postData = {
        ...data,
        userId: id,
        projectId: defaultProjectId,
      }

      const updatedProject = {
        ...project,
        savings: project.savings - data.amount,
      }

      try {
        await createExpense(postData)
        await updateProject({ id: defaultProjectId, project: updatedProject })
        message.success('Expense added successfully')
        reset()
        setShowModal(false)
        setExpenseForm(false)
      } catch (error) {
        message.error('Failed to add expense')
        console.error('Error adding expense:', error)
      }
    }
  }

  return (
    <div className="rounded-lg bg-white px-4 py-8 shadow-md w-4/5 sm:w-1/3 relative">
      <h2 className="text-teal-500 text-xl font-bold mb-6">Expense Details</h2>
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
          label="Expense Type"
          validateStatus={errors.expenseType ? 'error' : ''}
          help={errors.expenseType?.message}
        >
          <Controller
            name="expenseType"
            control={control}
            render={({ field }) => (
              <Select {...field} placeholder="Select expense type">
                <Select.Option value="OneOff">OneOff</Select.Option>
                <Select.Option value="Recurring">Recurring</Select.Option>
              </Select>
            )}
          />
        </Form.Item>

        <Form.Item
          label="Category"
          validateStatus={errors.category ? 'error' : ''}
          help={errors.category?.message}
        >
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select {...field} placeholder="Select category">
                {Object.values(Category).map((cat) => (
                  <Select.Option key={cat} value={cat}>
                    {cat}
                  </Select.Option>
                ))}
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
                value={field.value ? dayjs(field.value) : null}
                onChange={(date) =>
                  field.onChange(date ? date.toISOString() : '')
                }
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

      <CloseModalButton
        CloseFunction={() => {
          setShowModal(false)
          setExpenseForm(false)
        }}
      />
    </div>
  )
}

export default AddExpenseForm
