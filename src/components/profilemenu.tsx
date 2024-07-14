"use client";

import * as React from "react";
import { Menu, Button, Text } from "@mantine/core";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from 'wagmi/connectors';
import { IconUser, IconLogout, IconWallet } from "@tabler/icons-react"; // Example icons

const WalletMenu = () => {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  const shortenAddress = (address:string) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div>
      <Menu withArrow>
        <Menu.Target>
          <Button
           
            variant="outline"
            className="mr-3"
          >
            {isConnected  && address ? shortenAddress(address) : 'Connect Wallet'}
          </Button>
        </Menu.Target>
        <Menu.Dropdown p="md" mr="sm">
          {isConnected ? (
            <>
              <Menu.Label>Profile</Menu.Label>
              <Menu.Item leftSection={<IconUser size={14} />}>
                {/* Add your profile link here */}
                {/* <Link href={`/profile/${appUser.username}`}>View Profile</Link> */}
                View Profile
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item color="red" onClick={() => disconnect()}>
                <IconLogout size={14} />
                Logout
              </Menu.Item>
            </>
          ) : (
            <Menu.Item onClick={() => connect({
              connector:injected()
            })}>
              Connect Wallet
            </Menu.Item>
          )}
        </Menu.Dropdown>
      </Menu>
    </div>
  );
};

export default WalletMenu;
