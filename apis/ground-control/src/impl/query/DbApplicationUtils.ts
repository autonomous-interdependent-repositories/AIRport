import { FullApplicationName } from '../..';
import { ColumnName } from '../../lingo/application/Property';

export function getFullApplicationName({
	domain, name,
}): string {
	if (domain.name) {
		domain = domain.name;
	}

	return getFullApplicationNameFromDomainAndName(domain, name);
}

export function getFullApplicationNameFromDomainAndName(
	domainName,
	applicationName,
): string {
	if (domainName.indexOf('___') > -1) {
		throw new Error('Domain Name cannot contain "___" (3 consecutive underscores) in it.');
	}

	if (domainName.endsWith('.')
		|| domainName.endsWith('-')
		|| domainName.endsWith(':')
		|| domainName.endsWith('__')) {
		throw new Error('Domain Name cannot end with ".", "-", ":" or "__"');
	}

	const domainPrefix = domainName
		.replace(/\./g, '_dot_')
		.replace(/-/g, '_dash_')
		.replace(/:/g, '_colon_');

	if (domainPrefix.indexOf('___') > -1) {
		throw new Error('Domain Name cannot have with ".", "-", ":", or "_" right next to each other.');
	}

	if (applicationName.indexOf('_') > -1) {
		throw new Error('Application Name cannot contain "_" in it.');
	}

	if (applicationName.indexOf('@') !== applicationName.lastIndexOf('@')) {
		throw new Error('Application Name cannot have more than one "@" in it.');
	}

	if (applicationName.indexOf('@') > 0) {
		throw new Error('Application Name cannot contain "@" after the first character in it.');
	}

	if (applicationName.indexOf('/') !== applicationName.lastIndexOf('/')) {
		throw new Error('Application Name cannot have more than one "/" in it.');
	}

	const applicationPrefix = applicationName
		.replace(/@/g, '_at_')
		.replace(/\//g, '_slash_')
		.replace(/-/g, '_dash_');

	if (applicationPrefix.endsWith('_')) {
		throw new Error('Application Name cannot end with "@", "/" or "."');
	}

	if (applicationPrefix.indexOf('___') > -1) {
		throw new Error('Application Name cannot have with "@", "/", "." or "_" right next to each other.');
	}

	return `${domainPrefix}___${applicationPrefix}`;
}

export function getSequenceName(
	prefixedTableName: string,
	columnName: ColumnName,
): string {
	return `${prefixedTableName}_${columnName}__SEQUENCE`;
}
