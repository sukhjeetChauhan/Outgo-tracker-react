import { DownOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Button, Dropdown, Space } from 'antd'

const items: MenuProps['items'] = [
  { label: 'None', key: '0' },
  {
    label: 'Food',
    key: '1',
  },
  {
    label: 'Groceries',
    key: '2',
  },
  {
    label: 'Car',
    key: '3',
  },
  {
    label: 'Business',
    key: '4',
  },
  {
    label: 'Rent',
    key: '5',
  },
  {
    label: 'Bills',
    key: '6',
  },
  {
    label: 'Entertainment',
    key: '7',
  },
  {
    label: 'Shopping',
    key: '8',
  },
  {
    label: 'Health',
    key: '9',
  },
  {
    label: 'Transport',
    key: '10',
  },
  {
    label: 'Other',
    key: '11',
  },
]

export default function CategorySelection({
  selectedCategory,
  setSelectedCategory,
}: {
  selectedCategory: string
  setSelectedCategory: (Category: string) => void
}) {
  const handleMenuClick: MenuProps['onClick'] = (e) => {
    const selectedItem = items?.find((item) => item?.key === e.key)
    if (selectedItem && 'label' in selectedItem) {
      setSelectedCategory(selectedItem.label as string)
    }
  }
  const menuProps = {
    items,
    onClick: handleMenuClick,
  }

  return (
    <Dropdown menu={menuProps} trigger={['click']}>
      <Button className="!border-teal-300 hover:!border-teal-500 focus:!border-teal-500 !text-teal-300 hover:!text-teal-500 focus:!text-teal-500 !text-xl">
        <Space>
          {`${
            selectedCategory && selectedCategory !== 'None'
              ? selectedCategory
              : 'Select Category'
          }`}
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  )
}
