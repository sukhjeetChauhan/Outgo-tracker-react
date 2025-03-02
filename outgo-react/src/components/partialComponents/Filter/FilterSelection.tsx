import { DownOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Button, Dropdown, Space } from 'antd'

const items: MenuProps['items'] = [
  {
    label: 'Category',
    key: '1',
  },
  {
    label: 'Date',
    key: '2',
  },
]

export default function FilterSelection({
  setSelectedFilter,
}: {
  setSelectedFilter: (filter: string) => void
}) {
  const handleMenuClick: MenuProps['onClick'] = (e) => {
    const selectedItem = items?.find((item) => item?.key === e.key)
    if (selectedItem && 'label' in selectedItem) {
      setSelectedFilter(selectedItem.label as string)
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
          Filter By
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  )
}
