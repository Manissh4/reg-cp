import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { CustomInput } from '@/components/ui/custom-input';

interface Column {
    id: string;
    name: string;
    isAdded: boolean;
}

interface EditColumnModalProps {
    columns: Column[]
    setColumns: React.Dispatch<React.SetStateAction<Column[]>>;
}

const EditColumnModal = ({ columns, setColumns }: EditColumnModalProps) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredColumns = columns.filter(column =>
        column.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const addedColumns = filteredColumns.filter(column => column.isAdded);
    const availableColumns = filteredColumns.filter(column => !column.isAdded);

    const toggleColumn = (columnId: string) => {
        setColumns(prev => prev.map(col =>
            col.id === columnId ? { ...col, isAdded: !col.isAdded } : col
        ));
    };

    return (
        <div className="flex flex-col h-full py-4">
            {/* Search Input */}
            <div className="px-4">
                <CustomInput
                    type='search'
                    name='columnsSearch'
                    placeholder='search'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4"
                />
            </div>

            {/* Added Columns Section */}
            {addedColumns.length > 0 && (
                <div className='border-b border-[#DDDDDD] py-4 pl-4 pr-2'>
                    <div className="flex flex-col gap-2 max-h-54 custom-scrollbar">
                        <p className="text-base font-semibold text-label-dark">Columns you've added</p>
                        <div className="flex flex-col pr-2">
                            {addedColumns.map((column) => (
                                <div
                                    key={column.id}
                                    className="flex items-center justify-between py-2"
                                >
                                    <div className='flex items-center gap-2'>
                                        <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="1.55557" cy="1.55557" r="1.55557" fill="#CFD3DF" />
                                            <circle cx="7.00088" cy="1.55557" r="1.55557" fill="#CFD3DF" />
                                            <circle cx="1.55557" cy="7.00088" r="1.55557" fill="#CFD3DF" />
                                            <circle cx="1.55557" cy="12.4444" r="1.55557" fill="#CFD3DF" />
                                            <circle cx="7.00088" cy="7.00088" r="1.55557" fill="#CFD3DF" />
                                            <circle cx="7.00088" cy="12.4444" r="1.55557" fill="#CFD3DF" />
                                        </svg>
                                        <p className="text-sm font-normal text-text-hint">{column.name}</p>
                                    </div>
                                    <button
                                        onClick={() => toggleColumn(column.id)}
                                        className="p-1 rounded-full bg-[#FFEEEA] cursor-pointer"
                                    >
                                        <Minus className="h-4 w-4 text-error" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Available Columns Section */}
            {availableColumns.length > 0 && (
                <div className='py-4 pl-4 pr-2'>
                    <div className="flex flex-col gap-2 max-h-54 custom-scrollbar">
                        <h3 className="text-base font-semibold text-label-dark">Columns you can add</h3>
                        <div className="flex flex-col pr-2">
                            {availableColumns.map((column) => (
                                <div
                                    key={column.id}
                                    className="flex items-center justify-between py-2"
                                >
                                    <p className="text-sm font-normal text-text-hint">{column.name}</p>
                                    <button
                                        onClick={() => toggleColumn(column.id)}
                                        className="p-1 rounded-full bg-[#EDF7E6] cursor-pointer"
                                    >
                                        <Plus className="h-4 w-4 text-success" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* No Results */}
            {filteredColumns.length === 0 && (
                <div className="p-4 text-center">
                    <p className="text-sm text-muted-foreground">No columns found</p>
                </div>
            )}
        </div>
    );
};

export default EditColumnModal;