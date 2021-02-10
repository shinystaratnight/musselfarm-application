import React, { FC } from 'react';
import { DownloadIcon, Paragrapgh, TagComponent } from '../shared';

interface IOwnProps {
  date: string;
  price: string;
  status: string;
  className?: string;
}

const Transaction: FC<IOwnProps> = ({ date, price, status, className }) => {
  return (
    <div className={className ? `${className} transaction` : 'transaction'}>
      <Paragrapgh size={1} color='black' align='default' fontWeight={500}>
        {date}
      </Paragrapgh>
      <Paragrapgh size={1} color='black' align='default' fontWeight={400}>
        ${price}
      </Paragrapgh>
      <TagComponent color='green'>{status}</TagComponent>
      <DownloadIcon />
    </div>
  );
};

export default Transaction;
