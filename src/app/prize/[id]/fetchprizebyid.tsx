

import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import PrizePageComponent from "@/components/prize/prizepage";
import { supabase } from '@/utils/helpers';
import { getBalance } from 'wagmi/actions';
import { config } from '@/utils/config';



export default async function FetchPrizeByID({ params }: { params: { id: number } }) {


  const prize = await supabase.from('prizes').select('*').eq('id', params.id).single();
  if(prize.error){
    redirect('/404');
  }
  const balance = await getBalance(config,{
    address:prize.data?.contract_address   as `0x${string}`,
  })

  return <PrizePageComponent prize={{
    ...prize.data,
    admins: prize.data?.admins ?? [] as string[],
    balance: (parseFloat(balance.value.toString()) / 1000000000000000000) as number
  }}  />;
}