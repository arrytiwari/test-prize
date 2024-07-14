"use client";
import React from 'react'
import ExploreCard from './explorecard'
import { useMutation, useQuery } from '@tanstack/react-query';
import { supabase } from '@/utils/helpers';
import { toast } from 'sonner';
import { getBalance } from 'wagmi/actions';
import { config } from '@/utils/config';

export default function FetchPrize() {
  const prizes = useQuery({
    queryKey: ['prizes'],
    queryFn: async () => {
      const response = (await supabase.from('prizes').select('*'));
      if(response.error) {
        toast.error(response.error.message);
        throw new Error(response.error.message);
      }
      const prizesWithBalancesPromises = response.data.map(async (prize) => {
        const balance = await getBalance(config,{
          address: prize.contract_address as `0x${string}`,
        })
        
        return {
          ...prize,
          balance : parseFloat(balance.value.toString()) / 1000000000000000000
        }
      })
      return Promise.all(prizesWithBalancesPromises);
      
    },
  })
  console.log(prizes)
  return (
    <div>
      {prizes.isLoading && <div>Loading...</div>}
      {prizes.isError && <div>Error: {prizes.error.message}</div>}
      {prizes.isSuccess && (
        <div>
          {prizes.data.map((prize) => (
            <ExploreCard key={prize.id} imageUrl={prize.image ?? ''} createdAt={prize.created_at} description={prize.description ?? ''} title={prize.title ?? ''} distributed={false}
             profileName={`${prize.proposer_address?.slice(0, 6)}...${prize.proposer_address?.slice(-4)}`} contestants={0} slug={prize.id.toString()} usdAmount={prize.balance.toString()} id={''} skills={[]} submissionMinutes={0} startingTimeBlockchain={0}    />
          ))}
        </div>
      )}
    </div>
  )
}
