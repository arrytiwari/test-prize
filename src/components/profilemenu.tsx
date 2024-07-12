import { Menu, Avatar, Popover } from '@mantine/core'
import { IconUser } from '@tabler/icons-react'
import React from 'react'

export default function ProfileMenu() {
  return (
    <div>
    <Menu withArrow  >
            <Menu.Target >
              <Avatar color="blue" radius="xl" className="cursor-pointer mr-3" >
                {/* {appUser.username.charAt(0).toUpperCase()} */}A
              </Avatar>
            </Menu.Target>
            <Menu.Dropdown p="md" mr="sm">
              <Menu.Label>Profile</Menu.Label>
              <Menu.Item
                leftSection={<IconUser size={14} />}
                // onClick={() => {
                //   router
                //     .push(`/profile/${appUser?.username}`)
                //     .then(console.log)
                //     .catch(console.error);
                // }}
              >
                {/* <Link href={`/profile/${appUser.username}`}>View Profile</Link> */}
              </Menu.Item>
             
              <Menu.Divider />
              <Menu.Item
                color="red"
                // leftSection={<IoExit size={14} />}
                // onClick={handleLogout}
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        
    
    </div>
  )
}
