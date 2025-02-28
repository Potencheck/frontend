import DeleteIcon from '@/assets/icons/x-02.svg?react';

type CertTagProps = {
  name: string;
  onDelete: (name: string) => void;
};

const CertTag = ({ name, onDelete }: CertTagProps) => {
  return (
    <div className="w- gap-1 px-4 py-2 rounded-[20px] border border-border-line justify-center items-center inline-flex">
      <p className='whitespace-nowrap'>{name}</p>
      <div className="cursor-po" onClick={() => onDelete(name)}>
        <DeleteIcon />
      </div>
    </div>
  );
};

export default CertTag;
