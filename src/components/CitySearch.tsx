
import {  CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from './ui/command'
import { Button } from './ui/button'
import { useState } from 'react'
import { Loader2, Search } from 'lucide-react';
import { useLocationSearch } from '@/hooks/use-weather';

const CitySearch = () => {

  const[open,setOpen]=useState(false);
  const[query,setQuery]=useState("");

  const{data:locations,isLoading}=useLocationSearch(query)

  const handleSelect =()=>{
    const loc = location
    console.log(loc)

  }
  return (
    
    <>

    <Button
    variant="outline"
    className= 'relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64 '
    
    onClick={()=>setOpen(true)}><Search className='mr-2 h-4 w-4'></Search> Search cities.. </Button>
   
    <CommandDialog className='w-[500px] mx-auto' open={open} onOpenChange={setOpen}>
        <CommandInput 
        
        placeholder=" search..."
        value={query}
        onValueChange={setQuery}
        
        />
        <CommandList>
          {query.length > 2 && !isLoading && <CommandEmpty>No results found.</CommandEmpty>}
          
          
          <CommandGroup heading="Favorites">
            <CommandItem>
              calendar
            </CommandItem>
          </CommandGroup>
          <CommandSeparator/>

          <CommandGroup heading="recent searches">
            <CommandItem>
              calendar
            </CommandItem>
          </CommandGroup>
          <CommandSeparator/>
            {locations && locations.length > 0 && (

          <CommandGroup heading="Suggestions">
            {isLoading && (
              <div className='flex items-center justify-center p-4'>
                <Loader2 className='h-4 w-4 animate-spin'></Loader2>
              </div>
            )}
            {locations.map((location)=>{

            return <CommandItem 
                            key={`${location.lat}-${location.lon}`}
                            value={`${location.lat}| ${location.lon} | ${location.name} | ${location.state} | ${location.country}`}
                            onSelect={handleSelect}

            >
                <Search className='mr-2 h-4 w-4 '>
                </Search>

                 <span>
                            {location.name}
                          </span>
                  {location.state && (
                    <span className= ' text-sm text-muted-foreground'>
                    , {location.state}
                    </span>
                  )}

                  <span className='text-muted-foreground text-sm '>
                      , {location.country}
                    </span>


                       
                   </CommandItem>
            })}
            
          </CommandGroup>
)}

        </CommandList>
      </CommandDialog>
    
    </>
    
  )
}

export default CitySearch