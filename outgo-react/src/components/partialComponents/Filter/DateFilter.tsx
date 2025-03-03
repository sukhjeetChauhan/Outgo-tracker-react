import type { DatePickerProps } from 'antd'
import { DatePicker, Space } from 'antd'

export default function DateFilter({
  setSelectedDate,
}: {
  setSelectedDate: (date: string) => void
}) {
  const onChange: DatePickerProps['onChange'] = (date) => {
    setSelectedDate(date.toISOString())
  }

  return (
    <Space direction="vertical" size={12}>
      <DatePicker onChange={onChange} />
    </Space>
  )
}
