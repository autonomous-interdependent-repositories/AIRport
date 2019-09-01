import {
	Entity,
	GeneratedValue,
	Id,
	OneToMany,
	Table
}                           from "@airport/air-control";
import {
	PackageId,
	PackageName
} from '@airport/ground-control'
import {ApplicationPackage} from "./ApplicationPackage";


@Entity()
@Table({name: "PACKAGES"})
export class Package {

	@Id()
	@GeneratedValue()
	id: PackageId

	name: PackageName

	@OneToMany({mappedBy: "package"})
	applicationPackages: ApplicationPackage[] = []

}