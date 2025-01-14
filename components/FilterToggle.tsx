'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Clock, ArrowUp, ArrowDown } from 'lucide-react'

interface FilterToggleProps {
onFilterChange: (filter: 'latest' | 'best' | 'worst') => void
}

export function FilterToggle({ onFilterChange }: FilterToggleProps) {
const [activeFilter, setActiveFilter] = useState<'latest' | 'best' | 'worst'>('latest')

const handleFilterChange = (filter: 'latest' | 'best' | 'worst') => {
setActiveFilter(filter)
onFilterChange(filter)
}

const buttonClassName = "text-yellow-400 hover:text-yellow-400 bg-gray-800 hover:bg-black text-xs lg:text-sm md:text-xs sm:text-[10px]"

return (
<div className="flex space-x-2 scale-80">
    <Button
    variant={activeFilter === 'latest' ? 'default' : 'outline'}
    onClick={() => handleFilterChange('latest')}
    className={buttonClassName}
    >
    <Clock className="mr-2 h-4 w-4 lg:h-4 lg:w-4 md:h-3 md:w-3 sm:h-2 sm:w-2" />
    Latest
    </Button>
    <Button
    variant={activeFilter === 'best' ? 'default' : 'outline'}
    onClick={() => handleFilterChange('best')}
    className={buttonClassName}
    >
    <ArrowUp className="mr-2 h-4 w-4 lg:h-4 lg:w-4 md:h-3 md:w-3 sm:h-2 sm:w-2" />
    Best Bags
    </Button>
    <Button
    variant={activeFilter === 'worst' ? 'default' : 'outline'}
    onClick={() => handleFilterChange('worst')}
    className={buttonClassName}
    >
    <ArrowDown className="mr-2 h-4 w-4 lg:h-4 lg:w-4 md:h-3 md:w-3 sm:h-2 sm:w-2" />
    Worst Bags
    </Button>
</div>
)
}

