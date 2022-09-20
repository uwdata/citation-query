#! /usr/bin/env node
// Remove the local file-based cache in the '.cache' directory
import { deleteCache } from '@uwdata/file-cache';
deleteCache();
