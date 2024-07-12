'use client'
import { Avatar, Box, Button, Center, Divider, Menu,rem,Stack,Text } from '@mantine/core'
import { IconChevronDown, IconInfoCircleFilled, IconSearch, IconUser } from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ProfileMenu from './profilemenu'

export default function Header() {
  return (
  <div className="flex justify-between items-center mx-4 my-2">
    <div className="flex space-x-4 items-center">
        <Image src="/prize.png" alt="logo" width={50} height={50} />
        <Menu shadow="md" position="bottom" trigger="hover">
          <Menu.Target>
            <Center>
              <Box
                // href="/prize/explore"
                className="pl-3 font-bold hover:text-blue-600 "
              >
                PRIZES
              </Box>
              <IconChevronDown style={{ width: rem(20), height: rem(16) }} />
            </Center>
          </Menu.Target>
          <Menu.Dropdown>
            <Stack gap="md" p="md">
              <Menu.Item>
                <Link href="/prize/about" className="flex items-center">
                  <IconInfoCircleFilled />

                  <Text size="md" fw={500} className="pl-1">
                    About
                  </Text>
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link href="/prize/explore" className="flex items-center">
                  <IconSearch />

                  <Text size="md" fw={500} className="pl-1">
                    Explore Prizes
                  </Text>
                </Link>
              </Menu.Item>
              <Divider />
              <Button>
                <Link href="/prize/create">Create Prize</Link>
              </Button>
            </Stack>
          </Menu.Dropdown>
        </Menu>
    </div>
   <ProfileMenu/>
  </div>
  )
}
