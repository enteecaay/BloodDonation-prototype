
"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { BloodUnit, BloodType } from "@/types"; // Assuming BloodType is exported or use string[]
import { bloodTypes } from "@/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Droplet, Building, Edit, Filter, PlusCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";


// Mock blood unit data
const mockBloodUnits: BloodUnit[] = [
  { id: "bu001", hospitalId: "staff-001", hospitalName: "City General Hospital", bloodType: "O+", quantity: 50, lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), status: 'available' },
  { id: "bu002", hospitalId: "staff-001", hospitalName: "City General Hospital", bloodType: "A-", quantity: 5, lastUpdated: new Date(Date.now() - 1000 * 60 * 30).toISOString(), status: 'low' },
  { id: "bu003", hospitalId: "staff-002", hospitalName: "County Medical Center", bloodType: "B+", quantity: 20, lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), status: 'available' },
  { id: "bu004", hospitalId: "staff-002", hospitalName: "County Medical Center", bloodType: "AB+", quantity: 2, lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(), status: 'critical' },
  { id: "bu005", hospitalId: "staff-001", hospitalName: "City General Hospital", bloodType: "O-", quantity: 15, lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), status: 'available' },
  { id: "bu006", hospitalId: "staff-003", hospitalName: "St. Luke's Downtown", bloodType: "A+", quantity: 30, lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), status: 'available' },
];

export default function BloodUnitManagementClient() {
  const { user: adminUser, role, loading } = useAuth();
  const router = useRouter();
  const [units, setUnits] = useState<BloodUnit[]>(mockBloodUnits);
  const [filterBloodType, setFilterBloodType] = useState<string>("");
  const [filterHospital, setFilterHospital] = useState<string>("");


  useEffect(() => {
    if (!loading && (role !== 'admin' || !adminUser)) {
      router.push('/login?redirect=/admin/blood-units');
    }
  }, [adminUser, role, loading, router]);

  if (loading || role !== 'admin' || !adminUser) {
    return <div className="text-center py-10">Loading blood unit data or unauthorized access...</div>;
  }

  const getStatusBadgeVariant = (status?: 'available' | 'low' | 'critical'): 'default' | 'secondary' | 'destructive' => {
    switch (status) {
      case 'low': return 'secondary'; // Yellowish/Orangeish
      case 'critical': return 'destructive'; // Red
      case 'available':
      default: return 'default'; // Greenish (assuming default is for good status)
    }
  };

  const handleEditUnit = (unitId: string) => {
    alert(`Editing blood unit ID: ${unitId} (Not Implemented). Admins might typically adjust or log external changes.`);
  };
  
  const handleAddUnit = () => {
    alert(`Adding new blood unit (Not Implemented). This form would allow specifying hospital, blood type, quantity etc.`);
  };

  const filteredUnits = units.filter(unit => 
    (filterBloodType ? unit.bloodType === filterBloodType : true) &&
    (filterHospital ? unit.hospitalName.toLowerCase().includes(filterHospital.toLowerCase()) : true)
  );

  const uniqueHospitalNames = Array.from(new Set(mockBloodUnits.map(unit => unit.hospitalName)));


  return (
    <Card className="shadow-xl">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Building size={28} className="text-primary" /> All Hospital Blood Units
            </CardTitle>
            <CardDescription>
              Total unique units listed: {filteredUnits.length} (out of {units.length}). Filter and manage stock.
            </CardDescription>
          </div>
           <Button onClick={handleAddUnit} className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <PlusCircle size={18} className="mr-2"/> Add New Unit Log
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6 p-4 border rounded-lg bg-secondary/30">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2"><Filter size={20}/> Filters</h3>
            <div className="grid md:grid-cols-2 gap-4">
                 <Select onValueChange={setFilterBloodType} value={filterBloodType}>
                    <SelectTrigger>
                        <SelectValue placeholder="Filter by Blood Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="">All Blood Types</SelectItem>
                        {bloodTypes.map(bt => <SelectItem key={bt} value={bt}>{bt}</SelectItem>)}
                    </SelectContent>
                </Select>
                <Input 
                    type="text"
                    placeholder="Filter by Hospital Name..."
                    value={filterHospital}
                    onChange={(e) => setFilterHospital(e.target.value)}
                />
            </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Hospital Name</TableHead>
              <TableHead>Blood Type</TableHead>
              <TableHead className="text-center">Quantity (Units)</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUnits.map((unit) => (
              <TableRow key={unit.id}>
                <TableCell>
                  <div className="font-medium">{unit.hospitalName}</div>
                  <div className="text-xs text-muted-foreground">ID: {unit.hospitalId}</div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-lg px-2 py-1">{unit.bloodType}</Badge>
                </TableCell>
                <TableCell className="text-center font-semibold text-xl">{unit.quantity}</TableCell>
                <TableCell>
                  <Badge 
                    variant={getStatusBadgeVariant(unit.status)}
                    className={`capitalize ${
                        unit.status === 'available' ? 'bg-green-500 hover:bg-green-600' 
                      : unit.status === 'low' ? 'bg-yellow-500 hover:bg-yellow-600' 
                      : unit.status === 'critical' ? 'bg-red-500 hover:bg-red-600'
                      : 'bg-gray-500' // Default for undefined status
                    } text-white`}
                  >
                    {unit.status || 'N/A'}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(unit.lastUpdated).toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => handleEditUnit(unit.id)} title="Edit Unit Details">
                    <Edit className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filteredUnits.length === 0 && <p className="text-center text-muted-foreground py-8">No blood units match the current filters.</p>}
      </CardContent>
    </Card>
  );
}
